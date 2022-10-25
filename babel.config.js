module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          blacklist: null,
          allowUndefined: true,
          verbose: false,
          whitelist: [
            'REACT_APP_SERVER',
            'ENVIRONMENT',
            'EXPO_CLIENT_ID',
            'GOOGLE_API_TOKEN',
          ],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
