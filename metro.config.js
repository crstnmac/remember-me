// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

const {
  resolver: { sourceExts },
  resolver,
} = config;

module.exports = {
  ...config,
  resolver: {
    ...resolver,
    sourceExts: [...sourceExts, 'mjs'],
  },
};
