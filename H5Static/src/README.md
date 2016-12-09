目前，目录结构主要分成三个文件夹（assets、component、module）

webpack
|---build
|---src
    |---assets 资源
        |---font/  字体图标
        |---conf.js 配置文件
        |---css.css  css
        |---vtouch.js 模拟屏幕手势
    |---components 通用组件
    |---filters 过滤器
    |---module各个页面模块
        |---personal    个人信息页模块
            |---routers 路由文件
            |---store 数据操作
            |---views 路由对应的页面
            |---personal.html
            |---personal.js
            |---personal.vue
        |---process    购票流程页模块
            |---routers 路由文件
            |---store 数据操作
            |---views 路由对应的页面
            |---process.html
            |---process.js
            |---process.vue
|---static
    |---css 公共样式
    |---js 公共js
ps： 
（1）personal、process分别为单页面，使用vue-router设置前端路由，personal较为复杂，可以尝试再拆分。
（2）vue 前后端分离，一般在组件ready钩子函数中请求服务器数据在前端用js渲染。
（3）ajax交互使用vue-resource
（4）assets和static可以试着合并掉