import Toast from "./Toast";

const  obj = {}

obj.install = function (Vue) {
  console.log('执行了objInstall函数');
  //1.创建组件构造器
  const  toastConstructor = Vue.extend(Toast)

  //2.new方式，根据组件构造器，创建一个组件对象
  const  toast = new toastConstructor()

  //3.将组件对象，手工挂载到某个元素上，这里我就创建一个div元素
  toast.$mount(document.createElement('div'))

  //4.toast.$el对应的就是div  把div挂载到document.body里面
  document.body.appendChild(toast.$el)

  //5.prototype(原型)  $toast = toast  后面就可以通过$toast方式 使用这个全局组件弹窗
  Vue.prototype.$toast = toast
}
export default obj