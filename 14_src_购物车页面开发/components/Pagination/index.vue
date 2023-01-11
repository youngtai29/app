<template>
  <div class="pagination">
    <h2>{{ pageNo }}</h2>
    <button v-if="pageNo > 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button @click="$emit('getPageNo', 1)" v-if="pageNo > 3">1</button>
    <button @click="$emit('getPageNo', 2)" v-if="pageNo > 4">2</button>
    <button v-if="pageNo > 5">...</button>

    <button
      @click="$emit('getPageNo', num)"
      v-if="num >= startNumAndEndNum.start"
      v-for="num in startNumAndEndNum.end"
    >
      {{ num }}
    </button>

    <button v-if="pageNo < totalPage - 4">...</button>

    <button
      @click="$emit('getPageNo', totalPage - 1)"
      v-if="pageNo === totalPage - 4"
    >
      {{ totalPage - 1 }}
    </button>
    <button
      @click="$emit('getPageNo', totalPage)"
      v-if="pageNo < totalPage - 2"
    >
      {{ totalPage }}
    </button>

    <button v-if="pageNo < totalPage" @click="$emit('getPageNo', pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>
<!-- 
  （淘宝页面结构） 上一页 1 2 ... 8 9 10 11 12 ... 下一页 到第xx页 确定
  分页器数据分析：pageNo（当前页），pageSize（每一页展示多少条数据），
  total（整个分页器一共有多少条数据---/(每一页的数据数)=总页数）---91条数据，每页3条=31页
  连续页码数5|7（奇数--外观对称）

  先用模拟数据调试
 -->
<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      let start = 0,
        end = 0;
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        if (end > this.totalPage) {
          start = this.totalPage - this.continues + 1;
          end = this.totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
