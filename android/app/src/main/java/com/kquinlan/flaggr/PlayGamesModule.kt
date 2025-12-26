package com.kquinlan.flaggr

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.google.android.gms.games.PlayGames
import com.google.android.gms.games.SnapshotsClient
import com.google.android.gms.games.snapshot.SnapshotMetadataChange
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
    }

    @ReactMethod
    fun saveGame(key: String, data: String, promise: Promise) {
        val activity = currentActivity ?: run {
            promise.reject("E_NO_ACTIVITY", "Current activity is null")
            return
        }

        val snapshotsClient = PlayGames.getSnapshotsClient(activity)

        // Open the snapshot (create if it doesn't exist).
        // RESOLUTION_POLICY_MOST_RECENTLY_MODIFIED handles multi-device conflicts by keeping the latest file.
        snapshotsClient.open(key, true, SnapshotsClient.RESOLUTION_POLICY_MOST_RECENTLY_MODIFIED)
            .addOnCompleteListener { task ->
                if (!task.isSuccessful) {
                    promise.reject("E_OPEN_SNAPSHOT_FAILED", "Failed to open snapshot", task.exception)
                    return@addOnCompleteListener
                }

                val snapshot = task.result.data
                if (snapshot == null) {
                    promise.reject("E_SNAPSHOT_NULL", "Snapshot data was null")
                    return@addOnCompleteListener
                }

                try {
                    val bytes = data.toByteArray(Charsets.UTF_8)
                    snapshot.snapshotContents.writeBytes(bytes)
                    val metadataChange = SnapshotMetadataChange.Builder()
                        .setDescription("Game Data for $key")
                        .build()

                    snapshotsClient.commitAndClose(snapshot, metadataChange)
                        .addOnCompleteListener { commitTask ->
                            if (commitTask.isSuccessful) {
                                promise.resolve(true)
                            } else {
                                promise.reject("E_COMMIT_FAILED", "Failed to commit snapshot", commitTask.exception)
                            }
                        }
                } catch (e: IOException) {
                    promise.reject("E_WRITE_FAILED", "Failed to write data to snapshot", e)
                }
            }
    }

    @ReactMethod
    fun loadGame(key: String, promise: Promise) {
        val activity = currentActivity ?: run {
            promise.reject("E_NO_ACTIVITY", "Current activity is null")
            return
        }

        val snapshotsClient = PlayGames.getSnapshotsClient(activity)

        snapshotsClient.open(key, false, SnapshotsClient.RESOLUTION_POLICY_MOST_RECENTLY_MODIFIED)
            .addOnCompleteListener { task ->
                if (!task.isSuccessful) {
                    promise.resolve(null)
                    return@addOnCompleteListener
                }

                val snapshot = task.result.data
                if (snapshot == null) {
                    promise.resolve(null)
                    return@addOnCompleteListener
                }

                try {
                    val contents = snapshot.snapshotContents
                    if (contents.isClosed) {
                        promise.resolve(null)
                        return@addOnCompleteListener
                    }

                    val bytes = contents.readFully()
                    val dataString = String(bytes, Charsets.UTF_8)
                    promise.resolve(dataString)

                } catch (e: IOException) {
                    promise.reject("E_READ_FAILED", "Failed to read snapshot data", e)
                }
            }
    }
}