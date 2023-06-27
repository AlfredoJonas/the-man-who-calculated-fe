// next.config.js
module.exports = {
    publicRuntimeConfig: {
        APP_BASE_URL: process.env.APP_BASE_URL,
    },
    compiler: {
        styledComponents: true
    }
  };