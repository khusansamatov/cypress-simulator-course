const { defineConfig } = require("cypress")

module.exports = defineConfig({
  allowCypressEnv: false,
  viewportHeight: 1024,
  viewportWidth: 1700,
  e2e: {
    fixturesFolder: false,
  },
})