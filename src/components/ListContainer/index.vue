<template>
  <div>
    <!--列表-->
    <div class="list-container">
      <div class="sortList clearfix">
        <div class="center">
          <!--banner轮播-->
          <Carousel :list="bannerList"></Carousel>
        </div>
        <div class="right">
          <div class="news">
            <h4>
              <em class="fl">尚品汇快报</em>
              <span class="fr tip">更多 ></span>
            </h4>
            <div class="clearix"></div>
            <ul class="news-list unstyled">
              <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
              <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
              <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
              <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
              <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            </ul>
          </div>
          <ul class="lifeservices">
            <li class="life-item">
              <i class="list-item"></i>
              <span class="service-intro">话费</span>
            </li>
            <li class="life-item">
              <i class="list-item"></i>
              <span class="service-intro">机票</span>
            </li>
            <li class="life-item">
              <i class="list-item"></i>
              <span class="service-intro">电影票</span>
            </li>
            <li class="life-item">
              <i class="list-item"></i>
              <span class="service-intro">游戏</span>
            </li>
            <li class="life-item">
              <i class="list-item"></i>
              <span class="service-intro">彩票</span>
            </li>
            <li class="life-item">
              <i class="list-item"></i>
              <span class="service-intro">加油站</span>
            </li>
            <li class="life-item">
              <i class="list-item"></i>
              <span class="service-intro">酒店</span>
            </li>
            <li class="life-item">
              <i class="list-item"></i>
              <span class="service-intro">火车票</span>
            </li>
            <li class="life-item">
              <i class="list-item"></i>
              <span class="service-intro">众筹</span>
            </li>
            <li class="life-item">
              <i class="list-item"></i>
              <span class="service-intro">理财</span>
            </li>
            <li class="life-item">
              <i class="list-item"></i>
              <span class="service-intro">礼品卡</span>
            </li>
            <li class="life-item">
              <i class="list-item"></i>
              <span class="service-intro">白条</span>
            </li>
          </ul>
          <div class="ads">
            <img src="./images/ad1.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
export default {
  name: "ListContainer",
  // watch的两种写法：对象，函数。监听计算属性bannerList的变化（空数组--》服务器返回的数组）
  // this.$nextTick将回调延迟到下次DOM更新循环(v-for循环)之后执行。在修改数据之后立即使用它，然后等待DOM更新。
  // watch: {
  //   bannerList: {
  //     immediate: true,

  //     handler(newVal, oldVal) {
  //       // wacth监听到了数据回来，但是v-for遍历数据也是花时间的，要等dom结构更新完毕后才能new Swiper---用this.$nextTick
  //       this.$nextTick(() => {
  //         var mySwiper = new Swiper(
  //           // ".swiper-container" /* 这里也可以传真实dom */,
  //           this.$refs.mySwiper,
  //           {
  //             // direction: "vertical", // 垂直切换选项
  //             loop: true, // 循环模式选项

  //             // 如果需要分页器
  //             pagination: {
  //               el: ".swiper-pagination",
  //               clickable: true,
  //             },

  //             // 如果需要前进后退按钮
  //             navigation: {
  //               nextEl: ".swiper-button-next",
  //               prevEl: ".swiper-button-prev",
  //             },

  //             // 如果需要滚动条
  //             // scrollbar: {
  //             //   el: ".swiper-scrollbar",
  //             // },
  //           }
  //         );
  //       });
  //     },
  //   },
  // },
  mounted() {
    // 挂载完毕，发ajax请求获取轮播图数据
    this.$store.dispatch("bannerList");
    // this.$nextTick(() => {
    //   console.log("mounted的nextTick");
    // });
    // console.log(this.bannerList);

    // newSwiper之前要先有html结构
    //ATN v-for生成结构在mounted之后，但是根据的是服务器返回的数据。实例化swiper实例之后，服务器的数据才返回，结构才生成
  },
  // 解法1：放在updated() {}---消耗大，每次更新都new
  // 解法2：放在定时器里，setTimeOut，勉强能用
  // 最终解法：watch监听+$nextTick()

  computed: {
    // ATN坑，要先取home仓库
    // ...mapState(["home"]),
    ...mapState({ bannerList: (state) => state.home.bannerList }),
  },
};
</script>

<style scoped lang="less">
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(./images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
