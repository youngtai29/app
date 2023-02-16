<template>
  <div ref="container" class="spec-preview">
    <img :src="skuImageList[imageIndex].imgUrl" />
    <!-- 鼠标移入（图片的容器）事件 -->
    <div @mousemove="mousemoveHandler" class="event"></div>
    <div class="big">
      <img ref="big" :src="skuImageList[imageIndex].imgUrl" />
    </div>
    <!-- 遮罩层（绿色的定位区） -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import { set } from "vue";
export default {
  name: "Zoom",
  data() {
    return {
      imageIndex: 0,
    };
  },
  props: ["skuImageList"],
  mounted() {
    this.$bus.$on("getIndex", (index) => {
      this.imageIndex = index;
    });
  },
  methods: {
    mousemoveHandler(event) {
      // 随着鼠标的移动，遮罩定位层也要跟着动

      // console.log(event.offsetX);
      // console.log(event.offsetY);
      // offsetWidth 属性是一个只读属性，它返回该元素的像素宽度，
      let container = this.$refs.container;
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      const maxLeft = container.offsetWidth - mask.offsetWidth;
      const maxTop = container.offsetHeight - mask.offsetHeight;

      // 修改mask元素的相对定位
      if (left < 0) left = 0;
      if (top < 0) top = 0;
      if (left > maxLeft) left = maxLeft;
      if (top > maxTop) top = maxTop;

      // if(left>)left=(1-mask.style.width)
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      big.style.left = -2 * left + "px";

      big.style.top = -2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
