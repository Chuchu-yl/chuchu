//解决没有编译器的问题的第一种方法
const path = require('path')
// __dirname: 内置代表当前文件的文件夹的绝对路径

/* 
根据目录/文件夹名得到其对应的绝对路径
*/
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  // 编写webpack配置
  configureWebpack: { 
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 自添加的文件扩展名
      alias: { 
         //表示去用有编译器的文件
        'vue$': 'vue/dist/vue.esm.js',
         //之后在文件中写路径的时候，@就代表是已经找到了src，不用../  ./等等找到
        '@': resolve('src')
      }
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000', // 目录地址
          changeOrigin: true, //是否跨域
          pathRewrite: {
            '^/api': '', // rewrite path
           
          },
        }
      }
    }
  }
}