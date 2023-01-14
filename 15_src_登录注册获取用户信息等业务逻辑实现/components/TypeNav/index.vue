<template>
  <div>
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <!-- 事件委托给父元素 -->
      <div @mouseenter="enterShow" @mouseleave="leaveIndex" class="container">
        <h2 class="all">全部商品分类</h2>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
        <transition name="sort">
          <div class="sort" v-show="showNav">
            <div class="all-sort-list2" @click.prevent="goSearch">
              <div
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                class="item"
                :class="{ cur: currentIndex === index }"
              >
                <!-- 鼠标移动谁（currentIndex===index）就给谁加一个class -->
                <h3 @mouseenter="changeIndex(index)">
                  <!-- <router-link to="">{{ c1.categoryName }}</router-link> -->

                  <a
                    :data-category1id="c1.categoryId"
                    :data-categoryname="c1.categoryName"
                    href=""
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 
                :style="{ display: currentIndex === index ? 'block' : 'none' }"
               -->
                <div v-show="currentIndex === index" class="item-list clearfix">
                  <div
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                    class="subitem"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-category2id="c2.categoryId"
                          :data-categoryname="c2.categoryName"
                          href=""
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link to="">{{ c2.categoryName }}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-category3id="c3.categoryId"
                            :data-categoryname="c3.categoryName"
                            href=""
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <router-link to="">{{ c3.categoryName }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// 这是lodash全部引入
// import _ from "lodash";
// 按需引入
import { throttle } from "lodash";
import { mapState } from "vuex";

export default {
  name: "TypeNav",
  data() {
    return {
      showNav: true,
      currentIndex: -1,
    };
  },
  methods: {
    enterShow() {
      this.showNav = true;
    },

    goSearch(event) {
      // console.log(
      //   event.target.dataset
      // ); /* DOMStringMap {v-18b3c0cc: '', category: '图书、音像、电子书刊'} */
      const { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      if (categoryname) {
        let location = { name: "search" };
        const query = { categoryName: categoryname };
        if (category1id) query.category1Id = category1id;
        else if (category2id) query.category2Id = category2id;
        else if (category3id) query.category3Id = category3id;
        location.query = query;
        if (this.$route.params) location.params = this.$route.params;
        this.$router.push(location);
        this.showNav = false;
      }
      // console.log(categoryname);
    },
    changeIndex: throttle(function (index) {
      // index:鼠标移到的选项卡的数值
      // 不能写成箭头函数
      this.currentIndex = index;
      // console.log(index);
    }, 40),
    leaveIndex() {
      if (this.$route.path !== "/home") {
        this.showNav = false;
      }
      this.currentIndex = -1;
    },
  },
  computed: {
    ...mapState({
      // mapState的对象写法值是函数，在计算属性使用时执行，函数注入一个参数state（大仓库）
      categoryList: (state) => {
        // console.log(state.home.categoryList);
        return state.home.categoryList;
      },
      // console.log(state); //大仓库中的状态
    }),
  },
  mounted() {
    // 三级联动组件挂载完毕后
    // 通知Vuex发请求，获取数据，存储于仓库中
    // this.$store.dispatch("categoryList");//发请求的代码放在App.vue，请求只发一次，避免重复请求
    // 判断如果不是home组件，将组件隐藏（shownav=false）
    this.showNav = this.$route.path === "/home";
  },
};
</script>

<style scoped lang="less">
// 过渡动画的样式
.sort-enter {
  opacity: 0.6;
}
.sort-enter-to {
  opacity: 1;
  // transform: rotate(306deg);
}
.sort-enter-active {
  transition: all 0.5s linear; /* all 所有属性都将获得过渡效果 */
}
.cur {
  background-color: skyblue;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // 二三级分类，先隐藏，鼠标:hover再显示display：block
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              // display: block;
            }
          }
        }
      }
    }
  }
}
</style>
