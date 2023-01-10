<template>
  <div id="app">
    <!-- <h2>我是唯一根组件App</h2> -->
    <Header></Header>
    <router-view></router-view>
    <!-- 路由组件出口的地方 -->
    <!-- Footer在注册和登录页面是隐藏的 -->
    <!-- <Footer
      v-show="$route.path !== '/login' && $route.path !== '/register'"
    ></Footer> -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
};
</script>

<style></style>
