<template>
  <div class="order-content">
    <h2>我是我的订单页面</h2>
    <div class="title">
      <h3>我的订单</h3>
    </div>
    <div class="chosetype">
      <table>
        <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="orders">
      <table class="order-item">
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle"
                >2017-02-11 11:59　订单编号：7867473872181848
                <span class="pull-right delete"
                  ><img src="../images/delete.png" /></span
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="60%">
              <div class="typographic">
                <img src="../images/goods.png" />
                <a href="#" class="block-text"
                  >包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶
                  新款</a
                >
                <span>x1</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
            <td rowspan="2" width="8%" class="center">小丽</td>
            <td rowspan="2" width="13%" class="center">
              <ul class="unstyled">
                <li>总金额¥138.00</li>
                <li>在线支付</li>
              </ul>
            </td>
            <td rowspan="2" width="8%" class="center">
              <a href="#" class="btn">已完成 </a>
            </td>
            <td rowspan="2" width="13%" class="center">
              <ul class="unstyled">
                <li>
                  <a href="mycomment.html" target="_blank">评价|晒单</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td width="50%">
              <div class="typographic">
                <img src="../images/goods.png" />
                <a href="#" class="block-text"
                  >包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶
                  新款</a
                >
                <span>x1</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="order-item">
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle"
                >2017-02-11 11:59　订单编号：7867473872181848
                <span class="pull-right delete"
                  ><img src="../images/delete.png" /></span
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="60%">
              <div class="typographic">
                <img src="../images/goods.png" />
                <a href="#" class="block-text"
                  >包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶
                  新款</a
                >
                <span>x1</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
            <td rowspan="2" width="8%" class="center">小丽</td>
            <td rowspan="2" width="13%" class="center">
              <ul class="unstyled">
                <li>总金额¥138.00</li>
                <li>在线支付</li>
              </ul>
            </td>
            <td rowspan="2" width="8%" class="center">
              <a href="#" class="btn">已完成 </a>
            </td>
            <td rowspan="2" width="13%" class="center">
              <ul class="unstyled">
                <li>
                  <a href="mycomment.html" target="_blank">评价|晒单</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td width="50%">
              <div class="typographic">
                <img src="../images/goods.png" />
                <a href="#" class="block-text"
                  >包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶
                  新款</a
                >
                <span>x1</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="choose-order">
      <div class="pagination">
        <ul>
          <li class="prev disabled">
            <a href="javascript:">«上一页</a>
          </li>
          <li class="page actived">
            <a href="javascript:">1</a>
          </li>
          <li class="page">
            <a href="javascript:">2</a>
          </li>
          <li class="page">
            <a href="javascript:">3</a>
          </li>
          <li class="page">
            <a href="javascript:">4</a>
          </li>

          <li class="next disabled">
            <a href="javascript:">下一页»</a>
          </li>
        </ul>
        <div>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;共2页&nbsp;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyOrder",
  mounted() {
    console.log("myorder");
  },
};
</script>

<style scoped></style>
