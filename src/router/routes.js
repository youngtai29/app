/* 
该文件是配置路由信息
*/
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSucess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder";
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
  {
    name: "addcartsuccess",
    path: "/addcartsuccess/:skuId/:skuNum",
    component: AddCartSucess,
    meta: { showFooter: true },
  },
  {
    name: "shopcart",
    path: "/shopcart",
    component: ShopCart,
    meta: { showFooter: true },
  },
  {
    name: "trade",
    path: "/trade",
    component: Trade,
    meta: { showFooter: true },
  },
  {
    name: "pay",
    path: "/pay",
    component: Pay,
    meta: { showFooter: true },
  },
  {
    name: "paysuccess",
    path: "/paysuccess",
    component: PaySuccess,
    meta: { showFooter: true },
  },
  {
    children: [
      {
        name: "myorder",
        /* 路径要么写全,要么只写除开父路径的部分,不用/ */ path: "myorder",
        component: MyOrder,
      },
      {
        name: "grouporder",
        /* 路径要么写全,要么只写除开父路径的部分,不用/ */ path: "grouporder",
        component: GroupOrder,
      },
    ],

    name: "center",
    path: "/center",
    component: Center,
    meta: { showFooter: true },
  },
  // 重定向默认定向到首页
  { path: "/", redirect: "/home" },
  // 个人中心默认定向到其子路由(myorder),显示---我的订单页面
  { path: "/center", redirect: "/center/myorder" },
];
