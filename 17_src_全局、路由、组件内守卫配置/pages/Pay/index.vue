<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥17,654</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" @click="showPayCode">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "Pay",
  // ATNVue项目中不允许给生命周期函数加async
  mounted() {
    this.getPayInfo();
  },
  data() {
    return {
      orderId: this.$route.query.orderId,
      // 支付状态码
      code: 201,
    };
  },
  methods: {
    async getPayInfo() {
      try {
        await this.$API.reqPayInfo(this.orderId);
      } catch (error) {
        alert(error.message);
      }
    },
    // 点击立即支付，出现遮罩层，支付二维码(京东处理：跳转到一个包含二维码的新页面，二维码60s失效,失效后无法被扫（有遮罩）)
    async showPayCode() {
      //生成二维码
      let qrCode = await QRCode.toDataURL(
        "https://blog.csdn.net/qq_45059691/article/details/128051615"
      );
      // console.log(qrCode); //data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA......

      // 以$alert方式调用时，点击遮罩和Esc无法关闭
      this.$alert(
        `<img src=${qrCode} />`, //ATN细节，}和/要有空格隔开,不然/会算成是url的内容
        "请微信扫二维码支付",
        /* 第二个参数：标题 */ {
          dangerouslyUseHTMLString: true, //dangerouslyUseHTMLString----是否将message属性作为HTML片段处理
          center: true, //设置其中的html内容在弹出框中居中，默认靠左
          showCancelButton: true,
          cancelButtonText: "支付遇见问题",
          confirmButtonText: "已支付成功",
          // showClose
          showClose: false,
          // 关闭前的回调(action的值为"confirm",'cancel'或"close",istance--实例，可以用message的方法和属性，done---关闭实例（让弹框消失）)
          // 这里注意写成箭头函数形式,不然this弄丢了
          beforeClose: (action, instance, done) => {
            // 该回调在点击确认\取消按钮,或者close时触发,触发时传入对应action
            console.log(action, instance);
            if (action === "cancel") {
              // console.log(1);

              // alert("跳转到支付帮助页面");
              clearInterval(this.timer);
              this.timer = null;
              // 关闭弹出框
              done();
            } else if (action === "confirm" && this.code === 201) {
              console.log(1);
              //和下面返回200的之后执行的逻辑重复了?QS
              // alert("跳转到支付帮助页面");
              clearInterval(this.timer);
              this.timer = null;
              // 关闭弹出框
              done();
              this.$router.push("/paysuccess");
            } else {
              console.log(action, this);
            }
          },
        }
      )
        .then(
          ({ value }) => {
            // .then是beforeClose之后执行的内容,(Close了之后执行的内容)---
            // 如果点的是cancel,返回一个promise失败的对象,reason是'cancel'
            // ATN有了reason的回调,就不会执行catch了
            //确定后逻辑接口
            // console.log(value);
          }
          // (reason) => {
          //   // console.log(reason);//cancel
          // }
        )
        .catch((error) => {
          alert("跳转到支付帮助页面");
          // console.log(2);
          // console.log(error.message);
        });
      // 支付成功或失败要向后台发请求获得，如果没有得到结果（可能用户没来得及支付），就要一直向后台发请求（在支付订单关闭前）
      // 设置一个定时器
      if (!this.timer) {
        this.timer = setInterval(async () => {
          const result = await this.$API.reqPayStatus(this.orderId);
          // 支付成功后
          if (result.code === 200 /* || result.code === 201 */) {
            // 清除定时器
            clearInterval(this.timer);
            this.timer = null;
            // 保存支付成功返回的code...
            this.code = result.code;
            // 关闭弹出框
            this.$msgbox.close();
            // 跳转到支付成功的页面
            this.$router.push("/paysuccess");
          }
        }, 10000); //定时器请求的进度条就不要显示了
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
