<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          v-for="goodsInfo in cartInfoList"
          :key="goodsInfo.id"
          class="cart-list"
        >
          <li class="cart-list-con1">
            <input
              @click="changeChecked(goodsInfo)"
              type="checkbox"
              :checked="goodsInfo.isChecked === 1"
              name="chk_list"
              id=""
              value=""
            />
          </li>
          <li class="cart-list-con2">
            <img :src="goodsInfo.imgUrl" />
            <div class="item-msg">
              {{ goodsInfo.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ goodsInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              @click="decSkuNum(goodsInfo, goodsInfo.skuNum - 1)"
              href="javascript:void(0)"
              class="mins"
              >-</a
            >
            <input
              @focus="oldNum = goodsInfo.skuNum"
              @keyup.enter="inputBlur"
              @change="changeGoodsNum(goodsInfo, $event)"
              autocomplete="off"
              type="text"
              v-model="goodsInfo.skuNum"
              minnum="1"
              class="itxt"
            />
            <a
              @click="addSkuNum(goodsInfo, goodsInfo.skuNum + 1)"
              href="javascript:void(0)"
              class="plus"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ goodsInfo.skuPrice * goodsInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              @click="deteleCart(goodsInfo.skuId)"
              href="#none"
              class="sindelet"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          @click="changeAllCheck"
          :checked="isAllChecked"
          class="chooseAll"
          type="checkbox"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCheckedCart" href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ total }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  data() {
    return {
      oldNum: 0,
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    inputBlur() {
      event.target.blur();
    },

    getData() {
      this.$store.dispatch("getShopCartList");
    },
    async deteleCart(skuId) {
      try {
        const response = await this.$store.dispatch("deleteShopCart", skuId);
        if (response === "ok") {
          this.getData();
        } else {
          alert("删除商品失败");
        }
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    },
    async checkShopCart(skuId, isChecked) {
      try {
        await this.$store.dispatch("checkShopCart", {
          skuId,
          isChecked,
        });

        this.getData();
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    },
    changeChecked(goodsInfo) {
      goodsInfo.isChecked = goodsInfo.isChecked === 1 ? 0 : 1;
      this.checkShopCart(goodsInfo.skuId, goodsInfo.isChecked);
    },
    async changeAllCheck() {
      // this.isAllChecked = !this.isAllChecked;
      // if (!this.isAllChecked) {
      //   this.cartInfoList.forEach((item) => {
      //     // 这里发了多次（商品类数）请求（有卡顿），受限于后台接口---考虑创建action方法统一发请求
      //     this.checkShopCart(item.skuId, 1);
      //   });
      // } else {
      //   this.cartInfoList.forEach((item) => {
      //     this.checkShopCart(item.skuId, 0);
      //   });
      // }
      try {
        await this.$store.dispatch("changeAllCheck", {
          cartList: this.cartInfoList,
          isChecked: !this.isAllChecked,
        });

        this.getData();

        // 下面先执行
        // console.log(response);
      } catch (error) {
        alert(error.message);
      }
    },
    addSkuNum(goodsInfo, num) {
      goodsInfo.skuNum = num;

      this.changeSkuNumHandler(goodsInfo.skuId, 1);
    },
    //节流函数
    decSkuNum: throttle(function (goodsInfo, num) {
      if (goodsInfo.skuNum > 1) {
        goodsInfo.skuNum = num;
        this.changeSkuNumHandler(goodsInfo.skuId, -1);
      }
    }),
    changeGoodsNum(goodsInfo, event) {
      // if (event.target.value.trim() === "") return;

      let value = event.target.value * 1;
      // console.log(value);

      // isNaN是判断一个值能否被 Number() 合法地转化成数字。
      // 过滤无法转为数字的非法字段和负数

      if (isNaN(value) || value < 1) {
        goodsInfo.skuNum = 1;
        // event.target.value = 1;
      } else {
        // 过滤小数，
        // event.target.value = parseInt(value);

        goodsInfo.skuNum = parseInt(value);
      }
      if (goodsInfo.skuNum !== this.oldNum)
        this.changeSkuNumHandler(
          goodsInfo.skuId,
          goodsInfo.skuNum - this.oldNum
        );
      // console.log(goodsInfo.skuNum, oldNum);
    },
    async changeSkuNumHandler(skuId, skuNum) {
      try {
        await this.$store.dispatch("addOrUpdateShopCart", { skuId, skuNum });
      } catch (error) {
        alert(error.message);
      }
    },
    deleteCheckedCart() {
      this.cartInfoList.forEach((item) => {
        if (item.isChecked === 1) this.deteleCart(item.skuId);
      });
      this.getData();
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [{}];
    },
    total() {
      let total = 0;
      this.cartInfoList
        .filter((item) => {
          return item.isChecked === 1;
        })
        .forEach((item) => {
          total += item.skuPrice * item.skuNum;
        });
      return total;
    },
    isAllChecked() {
      return this.cartInfoList.every((item) => {
        return item.isChecked === 1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 20.8333%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 13px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
