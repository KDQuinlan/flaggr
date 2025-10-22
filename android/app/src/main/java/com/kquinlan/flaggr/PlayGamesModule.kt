package com.kquinlan.flaggr

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.google.android.gms.games.PlayGames

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
    }
}
