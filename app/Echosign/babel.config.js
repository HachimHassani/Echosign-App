process.env.EXPO_ROUTER_APP_ROOT = "../../app";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "nativewind/babel",
    
      require.resolve("expo-router/babel"),
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.js', '.jsx', '.json'],
          alias: {
            _app: './app',
           
          },
        },
      ],
    ],
  };
};