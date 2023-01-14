<template>
  <!-- 这里外面再套div，会出现外部的样式丢失的问题 -->
  <div class="floorBanner">
    <div class="swiper-container" ref="floor2Swiper">
      <div class="swiper-wrapper">
        <div v-for="carousel in list" :key="carousel.id" class="swiper-slide">
          <img :src="carousel.imageUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",

  watch: {
    list: {
      immediate: true,
      handler() {
        // console.log("监听list数据");
        this.$nextTick(() => {
          var mySwiper = new Swiper(
            // ".swiper-container" /* 这里也可以传真实dom */,
            this.$refs.floor2Swiper,
            {
              // autoplay: true, //等同于以下设置
              autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                // 交互后也能继续轮播
                disableOnInteraction: false,
              },
              // direction: "vertical", // 垂直切换选项
              loop: true, // 循环模式选项

              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                clickable: true,
              },

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
  },
  props: ["list"],
};
</script>

<style scoped></style>
