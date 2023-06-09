module.exports = {
  "presets": ["@babel/preset-env"],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-modules-commonjs"
  ],
  "env": {
    "test": {     },
    "development": {
      "ignore": [
        "**/*.spec.js"
      ]
    },
    "production": {
      "ignore": [
        "**/*.spec.js"
      ]
    }
  }
}