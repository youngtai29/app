// Vue自定义插件---暴露一个对象，该对象必须要有install方法
let myPlugins = {};
myPlugins.install = function (Vue, options) {
  // console.log(Vue, "调用"); //第一个参数Vue(构造函数)---能访问其原型---挂东西
  Vue.directive(options.name, (el, params) => {
    // console.log(
    //   "xx",
    //   params
    // ); /* 传入的参数是自定义指令绑定的元素 ，第二个参数是一个对象，value属性是v-xxx指令被赋予的值,modifiers(对象{erha:true})是指令的修饰符*/
    el.innerHTML = params.value.toLowerCase();
  });
};
export default myPlugins;
