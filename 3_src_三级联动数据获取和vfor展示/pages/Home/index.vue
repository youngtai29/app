<template>
  <div>
    <h2>我是首页</h2>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Floor></Floor>
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
  computed: {
    // mapVuex属性需要在computed中配置
    // 模块式取用
    // ...mapState(["home"]),
  },
  components: { TypeNav, ListContainer, Recommend, Rank, Like, Floor, Brand },
};
</script>

<style scoped></style>
