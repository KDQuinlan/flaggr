const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = (config, props) => {
  const { androidAppId } = props;

  if (!androidAppId) {
    throw new Error(
      "withAdMob.js plugin requires an 'androidAppId' parameter. E.g., ['./withAdMob.js', { 'androidAppId': '...' }]"
    );
  }

  return withAndroidManifest(config, (modConfig) => {
    const manifest = modConfig.modResults.manifest;

    let app = manifest.application.find(
      (item) => item.$['android:name'] === '.MainApplication'
    );

    if (!app) {
      console.warn(
        'withAdMob plugin: Could not find .MainApplication. Using first application tag.'
      );
      app = manifest.application[0];
    }

    if (!app['meta-data']) {
      app['meta-data'] = [];
    }

    const existingTag = app['meta-data'].find(
      (item) =>
        item.$['android:name'] === 'com.google.android.gms.ads.APPLICATION_ID'
    );

    if (existingTag) {
      existingTag.$['android:value'] = androidAppId;
    } else {
      app['meta-data'].push({
        $: {
          'android:name': 'com.google.android.gms.ads.APPLICATION_ID',
          'android:value': androidAppId,
        },
      });
    }

    return modConfig;
  });
};
