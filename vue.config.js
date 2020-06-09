'use strict'

const port = process.env.port || process.env.npm_config_port || 3001 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js'),
    proxy: {
      '/acl-api': {
        changeOrigin: true,
        target: 'http://localhost:9999'
      }
    }
  },
  chainWebpack(config) {
  	config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
  }
}
