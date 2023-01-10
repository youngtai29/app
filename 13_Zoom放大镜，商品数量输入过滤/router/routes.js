/* 
该文件是配置路由信息
*/
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
export default [
  { path: "/home", component: Home, meta: { showFooter: true } },
  {
    name: "search",
    // path: "/search",
    path: "/search/:keyword?",
    component: Search,
    meta: { showFooter: true },
    // 路由组件传参方式---布尔值(只能传params参数)
    // props: true,
    // 对象写法---额外给路由传一些参数
    // props:{a:21,b:12}
    // 常用--函数写法
    // props: ($route) => {
    //   return { keyword: $route.params.keyword, k: $route.query.k };
    // },
  },
  { path: "/login", component: Login, meta: { showFooter: false } },
  { path: "/register", component: Register, meta: { showFooter: false } },
  { path: "/detail/:id?", component: Detail, meta: { showFooter: true } },
  // 重定向默认定向到首页
  { path: "/", redirect: "/home" },
];
