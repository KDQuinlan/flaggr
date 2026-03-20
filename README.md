# Flaggr 👋

The next generation of flag/geography quiz app, designed by what we wanted to see in one.

This app uses Expo@52, Google Play Games Services, Google AdMob, and RevenueCat as its primary tooling. 

Currently in development for the Play Store, with iOS coming later.

## Get started

1. Add android/local.properties with NDK path

   ```bash
   e.g. ndk.dir=C:\\ndk\\27.1.12297006
   ```

2. Install dependencies

   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the app

   ```bash
    npm run android
   ```

## Contributing

All new dependencies MUST be installed with

   ```bash
   npx expo install [packagename] '--' --legacy-peer-deps
   ```

As it lets Expo figure out which version to install it with. We require Expo@52 for our PGS integration.

For releases, ensure you update the version in the package.json and package-lock.json, and update the versionName and versionCode in app.json and build.gradle. Duplicate version codes cannot be uploaded to the play store.

Queries, problems, or suggestions? Reach out at grimlangames@gmail.com.