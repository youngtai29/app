<template>
  <div>
    <h2>我是首页</h2>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- 组件间通信，props父子组件通信。自定义事件：@on @emit自定义事件。$bus 。插槽 -->
    <Floor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :list="floor"
    ></Floor>
    <Brand></Brand>
    <!-- <button @click="add">点我+1</button> -->
    <!-- <span>仓库的数据{{ home.count }}</span>
    <button>点我-1</button> -->
  </div>
</template>

<script>
import TypeNav from "@/components/TypeNav";
import ListContainer from "@/components/ListContainer";
import Recommend from "@/components/Recommend";
import Rank from "@/components/Rank";
import Like from "@/components/Like";
import Floor from "@/components/Floor";
import Brand from "@/components/Brand";
import { mapState } from "vuex";

export default {
  name: "",
  methods: {
    add() {
      this.$store.dispatch("add");
    },
  },
  mounted() {
    this.$store.dispatch("floorList");
    console.log(this.floorList);
  },

  computed: {
    // mapVuex属性需要在computed中配置
    // 模块式取用
    // ...mapState(["home"]),
    ...mapState({ floorList: (state) => state.home.floorList }),
  },
  components: { TypeNav, ListContainer, Recommend, Rank, Like, Floor, Brand },
};
</script>

<style scoped></style>
