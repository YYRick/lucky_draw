/* 插件 */
import cj from './cj.vue'
export default {
  install(_Vue){
    //  console.log(_Vue) 
    //和vue 2.0一样  创造全局组件
    _Vue.component('cj',cj)
  }
}