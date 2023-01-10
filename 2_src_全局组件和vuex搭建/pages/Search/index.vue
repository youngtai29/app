<template>
  <div>
    <h2>我是搜索</h2>
    <h2>{{ $route.params }}</h2>
    <h2>{{ $route.query.k }}</h2>
    <h3 :style="{ color: 'red' }">
      {{ keyword }}
    </h3>
    <h3 :style="{ color: 'skyblue' }">
      {{ k }}
    </h3>
  </div>
</template>

<script>
export default {
  name: "",
  // props: ["keyword", "k"],
};
</script>

<style scoped></style>
