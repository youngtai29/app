<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(img, index) in skuImageList"
        :key="img.id"
      >
        <img
          @click="changeActiveFlag(index)"
          :class="{ active: currentIndex === index }"
          :src="img.imgUrl"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    changeActiveFlag(index) {
      this.$bus.$emit("getIndex", index);
      this.currentIndex = index;
    },
  },
  watch: {
    // 轮播图插件实例化在v-for结构生成之后
    skuImageList() {
      this.$nextTick(() => {
        new Swiper(
          ".swiper-container" /* 这里也可以传真实dom */,
          // this.$refs.floor2Swiper,
          // slidesPerGroup:（number）在carousel mode下定义slides的数量多少为一组(每次切换移动几个slider)。
          // slidesPerView--设置slider容器能够同时显示slides的数量（number/"auto"）
          {
            slidesPerView: 6,
            // slidesPerGroup: 1,
            grid: {
              fill: "row",
              rows: 1,
            },

            // autoplay: true, //等同于以下设置
            // autoplay: {
            //   delay: 3000,
            //   stopOnLastSlide: false,
            //   // 交互后不再继续轮播
            //   disableOnInteraction: true,
            // },
            // direction: "vertical", // 垂直切换选项
            // loop: true, // 循环模式选项(详情页的轮播图不需要loop)

            // 如果需要分页器
            // pagination: {
            //   el: ".swiper-pagination",
            //   clickable: true,
            // },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            // scrollbar: {
            //   el: ".swiper-scrollbar",
            // },
          }
        );
      });
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    // width: 56px;
    // height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
      // 用js实现，点击active样式为true
      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
