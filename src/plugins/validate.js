//引入vee-validate插件
import VeeValidate from "vee-validate";
import Vue from "vue";
Vue.use(VeeValidate);
// 表单验证的配置
// 中文的提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN"; // 引入中文文件
VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`, // 修改内置规则的message
  },
  attributes: {
    // 给校验的field属性名映射中文名称
    phone: "手机号",
    code: "验证码",
    password: "密码",
    password1: "确认密码",
    agree: "协议",
  },
});
// 自定义验证规则
VeeValidate.Validator.extend("agree", {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + "必须同意",
});
