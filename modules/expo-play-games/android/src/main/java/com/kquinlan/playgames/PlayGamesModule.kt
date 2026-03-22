package com.kquinlan.playgames

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import com.google.android.gms.games.PlayGames
import com.google.android.gms.games.SnapshotsClient
import com.google.android.gms.games.snapshot.SnapshotMetadataChange
import java.io.IOException

class PlayGamesModule : Module() {
    override fun definition() = ModuleDefinition {
        // This is the name JavaScript will use to find the module
        Name("ExpoPlayGames")

        AsyncFunction("signIn") { promise: Promise ->
            val activity = appContext.activityProvider?.currentActivity ?: run {
                promise.reject("E_NO_ACTIVITY", "Current activity is null", null)
                return@AsyncFunction
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
                            promise.reject("E_SIGN_IN_FAILED", "Sign-in failed", null)
                        }
                    }
                }
            }
        }

        AsyncFunction("submitScore") { leaderboardId: String, score: Double, promise: Promise ->
            val activity = appContext.activityProvider?.currentActivity ?: run {
                promise.reject("E_NO_ACTIVITY", "Current activity is null", null)
                return@AsyncFunction
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

        AsyncFunction("showAllLeaderboards") { promise: Promise ->
            val activity = appContext.activityProvider?.currentActivity ?: run {
                promise.reject("E_NO_ACTIVITY", "Current activity is null", null)
                return@AsyncFunction
            }

            val leaderboardsClient = PlayGames.getLeaderboardsClient(activity)

            leaderboardsClient.allLeaderboardsIntent.addOnCompleteListener { task ->
                if (task.isSuccessful && task.result != null) {
                    activity.startActivityForResult(task.result, 0)
                    promise.resolve(true)
                } else {
                    promise.reject("E_SHOW_ALL_LEADERBOARDS_FAILED", "Failed to show all leaderboards", task.exception)
                }
            }
        }

        AsyncFunction("saveGame") { key: String, data: String, promise: Promise ->
            val activity = appContext.activityProvider?.currentActivity ?: run {
                promise.reject("E_NO_ACTIVITY", "Current activity is null", null)
                return@AsyncFunction
            }

            val snapshotsClient = PlayGames.getSnapshotsClient(activity)

            snapshotsClient.open(key, true, SnapshotsClient.RESOLUTION_POLICY_MOST_RECENTLY_MODIFIED)
                .addOnCompleteListener { task ->
                    if (!task.isSuccessful) {
                        promise.reject("E_OPEN_SNAPSHOT_FAILED", "Failed to open snapshot", task.exception)
                        return@addOnCompleteListener
                    }

                    val snapshot = task.result.data
                    if (snapshot == null) {
                        promise.reject("E_SNAPSHOT_NULL", "Snapshot data was null", null)
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

        AsyncFunction("loadGame") { key: String, promise: Promise ->
            val activity = appContext.activityProvider?.currentActivity ?: run {
                promise.reject("E_NO_ACTIVITY", "Current activity is null", null)
                return@AsyncFunction
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

        AsyncFunction("getCurrentPlayer") { promise: Promise ->
            val activity = appContext.activityProvider?.currentActivity ?: run {
                promise.reject("NO_ACTIVITY", "Activity doesn't exist", null)
                return@AsyncFunction
            }

            val playersClient = PlayGames.getPlayersClient(activity)

            playersClient.currentPlayer.addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    val player = task.result
                    if (player == null) {
                        promise.reject("NO_PLAYER", "Player is null", null)
                        return@addOnCompleteListener
                    }

                    promise.resolve(mapOf(
                        "displayName" to player.displayName,
                        "playerId" to player.playerId
                    ))
                } else {
                    promise.reject("GET_PLAYER_FAILED", "Could not retrieve player info", task.exception)
                }
            }
        }
    }
}