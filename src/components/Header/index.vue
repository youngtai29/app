<template>
  <div>
    <!-- 头部 -->
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <p v-if="!userInfo.name">
              <span>请</span>
              <router-link to="/login">登录</router-link>
              <router-link class="register" to="/register"
                >免费注册</router-link
              >
              <!-- <a href="###">登录</a>
                <a href="###" class="register">免费注册</a> -->
            </p>
            <p v-else>
              <!-- <router-link to="/login">请登录</router-link> -->
              <a>{{ userInfo.name }}</a
              >&nbsp;&nbsp;|&nbsp;
              <a @click="logout">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/center/myorder">我的订单</router-link>
            <router-link to="/shopcart">我的购物车</router-link>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" title="尚品汇" to="/home" target="_blank">
            <img src="./images/logo.png" alt="" />
          </router-link>
          <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          </a> -->
        </h1>
        <div class="searchArea">
          <form onsubmit="return false" class="searchForm">
            <!-- QS这里有问题，回车第一下默认跳转form表单 -->
            <input
              @keyup.enter="goSearch"
              v-model="keyword"
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
            />
            <button
              @click="goSearch"
              class="sui-btn btn-xlarge btn-danger"
              type="button"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    ...mapState({ userInfo: (state) => state.login.userInfo }),
  },
  methods: {
    goSearch() {
      // 路由传参----字符串形式
      // this.$router.push(
      //   "/search/" + this.keyword + "?k=" + this.keyword.toUpperCase()
      // );
      //模板字符串形式
      // this.$router.push(
      //   `/search/${this.keyword}?k=${this.keyword.toUpperCase()}`
      // );
      // 对象形式---常用

      let location = {
        name: "search",
        params: { keyword: this.keyword === "" ? undefined : this.keyword },
      };
      if (this.$route.query) {
        location.query = this.$route.query;
      }
      this.$router.push(
        location
        //   {
        //   name: "search", //用params时要用name，不能用path(params会失效)
        //   // path: "/search",
        //   params: { keyword: this.keyword === "" ? undefined : this.keyword },
        //   query: { k: this.keyword.toUpperCase() },
        // }
      );
      // this.$router.push("/search");
    },
    async logout() {
      // 退出登录的逻辑，需要发请求通知服务器，还要清除一些数据【前端和后端】都要清除token，userInfo
      try {
        await this.$store.dispatch("userLogout");
        this.$router.push("/home");
      } catch (error) {
        alert(error.message);
      }
      // 退出登录还要跳到首页
    },
  },
  mounted() {
    this.$bus.$on("removeKeyword", () => {
      this.keyword = "";
    });
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .loginList {
        float: left;
        p {
          float: left;
          margin-right: 10px;
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }
      .typeList {
        float: right;
        a {
          padding: 0 10px;
          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .logoArea {
      float: left;
      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }
    .searchArea {
      float: right;
      margin-top: 35px;
      .searchForm {
        overflow: hidden;
        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;
          &:focus {
            outline: none;
          }
        }
        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
