const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
  //使用babel-plugin-import根据import进行打包
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  //修改@primary-color变量的属性
   addLessLoader({
     javascriptEnabled: true,
     modifyVars: {
       '@primary-color': '#1DA57A'
     },
   }),
);