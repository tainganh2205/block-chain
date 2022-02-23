const { override, fixBabelImports,addLessLoader,addWebpackPlugin } = require('customize-cra')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = override(
  fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { 
        '@primary-color': '#FAC668',
        '@component-background': '#323131'
      },
    },
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin())
 );