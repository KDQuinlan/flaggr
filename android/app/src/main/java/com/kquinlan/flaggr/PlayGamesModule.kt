package com.kquinlan.flaggr

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.google.android.gms.games.PlayGames
import com.google.android.gms.games.SnapshotsClient
import com.google.android.gms.games.snapshot.SnapshotMetadataChange
import com.google.android.gms.games.snapshot.Snapshot
import java.io.IOException

class PlayGamesModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "PlayGamesModule"

    @ReactMethod
    fun signIn(promise: Promise) {
        val activity = currentActivity ?: run {
            promise.reject("E_NO_ACTIVITY", "Current activity is null")
            return
        }

        val signInClient = PlayGames.getGamesSignInClient(activity)

        signInClient.isAuthenticated.addOnCompleteListener { task ->
            val isAuthenticated = task.isSuccessful && task.result.isAuthenticated
            if (isAuthenticated) {
                promise.resolve(true)
            } else {
                signInClient.signIn().addOnCompleteListener { signInResult ->
                    if (signInResult.isSuccessful && signInResult.result.isAuthenticated) {
                        promise.resolve(true)
                    } else {
                        promise.reject("E_SIGN_IN_FAILED", "Sign-in failed")
                    }
                }
            }
        }
    }

    @ReactMethod
    fun submitScore(leaderboardId: String, score: Double, promise: Promise) {
        val activity = currentActivity ?: run {
            promise.reject("E_NO_ACTIVITY", "Current activity is null")
            return
        }

        val leaderboardsClient = PlayGames.getLeaderboardsClient(activity)
        val scoreLong = score.toLong()

        // ✅ v2: submitScore() returns Unit — no addOnCompleteListener
        try {
            leaderboardsClient.submitScore(leaderboardId, scoreLong)
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("E_SUBMIT_FAILED", "Failed to submit score", e)
        }
    }

    @ReactMethod
    fun showAllLeaderboards(promise: Promise) {
        val activity = currentActivity ?: run {
            promise.reject("E_NO_ACTIVITY", "Current activity is null")
            return
        }

        val leaderboardsClient = PlayGames.getLeaderboardsClient(activity)

        leaderboardsClient.allLeaderboardsIntent.addOnCompleteListener { task ->
            if (task.isSuccessful && task.result != null) {
                activity.startActivityForResult(task.result, 0)
                promise.resolve(true)
            } else {
                promise.reject(
                    "E_SHOW_ALL_LEADERBOARDS_FAILED",
                    "Failed to show all leaderboards",
                    task.exception
                )
            }
        }
       private val snapshotsClient: SnapshotsClient
    get() = PlayGames.getSnapshotsClient(currentActivity!!)

/**
 * ---- SAVE GAME ----
 */
@ReactMethod
fun saveGame(filename: String, data: String, description: String, promise: Promise) {
    val activity = currentActivity
    if (activity == null) {
        promise.reject("ACTIVITY_NULL", "Activity is null")
        return
    }

    snapshotsClient.open(filename, true, SnapshotsClient.RESOLUTION_POLICY_MOST_RECENTLY_MODIFIED)
        .addOnSuccessListener { result ->

            // --- Handle conflicts ---
            if (result.isConflict) {
                val conflict = result.conflict!!
                val chosen = conflict.serverSnapshot ?: conflict.localSnapshot

                snapshotsClient.resolveConflict(
                    conflict.conflictId,
                    chosen!!.metadata,
                    chosen
                ).addOnSuccessListener {
                    promise.reject("CONFLICT_RESOLVED", "Conflict existed — resolved, retry save.")
                }.addOnFailureListener { e ->
                    promise.reject("CONFLICT_ERROR", e)
                }
                return@addOnSuccessListener
            }

            val snapshot = result.data
            if (snapshot == null) {
                promise.reject("SNAPSHOT_NULL", "Snapshot was null")
                return@addOnSuccessListener
            }

            try {
                // Write snapshot data
                snapshot.snapshotContents.writeBytes(data.toByteArray())

                // Metadata (description)
                val metadataChange = SnapshotMetadataChange.Builder()
                    .setDescription(description)
                    .build()

                // Commit + close
                snapshotsClient.commitAndClose(snapshot, metadataChange)
                    .addOnSuccessListener { promise.resolve(true) }
                    .addOnFailureListener { e -> promise.reject("COMMIT_ERROR", e) }

            } catch (e: IOException) {
                promise.reject("WRITE_ERROR", e)
            }
        }
        .addOnFailureListener { e ->
            promise.reject("OPEN_ERROR", e)
        }
}

/**
 * ---- LOAD GAME ----
 */
@ReactMethod
fun loadGame(filename: String, promise: Promise) {
    val activity = currentActivity
    if (activity == null) {
        promise.reject("ACTIVITY_NULL", "Activity is null")
        return
    }

    snapshotsClient.open(filename, false, SnapshotsClient.RESOLUTION_POLICY_MOST_RECENTLY_MODIFIED)
        .addOnSuccessListener { result ->

            // Conflict on load is uncommon but should be handled
            if (result.isConflict) {
                promise.reject("CONFLICT", "Snapshot conflict occurred while loading.")
                return@addOnSuccessListener
            }

            val snapshot = result.data
            if (snapshot == null) {
                promise.reject("NOT_FOUND", "Snapshot not found")
                return@addOnSuccessListener
            }

            try {
                val bytes = snapshot.snapshotContents.readFully()
                val text = String(bytes)

                // Always close after reading
                snapshot.close()

                promise.resolve(text)
            } catch (e: IOException) {
                promise.reject("READ_ERROR", e)
            }
        }
        .addOnFailureListener { e ->
            promise.reject("OPEN_ERROR", e)
        }
}


    @ReactMethod
    fun loadGame(filename: String, promise: Promise) {
        if (currentActivity == null) {
            promise.reject("ACTIVITY_NULL", "Activity is null")
            return
        }

        // 1. Open the snapshot (createIfNotFound = false)
        snapshotsClient.open(filename, false, SnapshotsClient.RESOLUTION_POLICY_MOST_RECENTLY_MODIFIED)
            .addOnSuccessListener { dataOrConflict ->
                val snapshot = dataOrConflict.data
                if (snapshot != null) {
                    // 2. Read the data
                    try {
                        val contents = snapshot.snapshotContents.readFully()
                        promise.resolve(String(contents))
                    } catch (e: IOException) {
                        promise.reject("READ_ERROR", e.message)
                    }
                } else {
                    promise.reject("NOT_FOUND", "Snapshot not found")
                }
            }
            .addOnFailureListener { e ->
                promise.reject("OPEN_ERROR", e.message)
            }
    }
    }
}
