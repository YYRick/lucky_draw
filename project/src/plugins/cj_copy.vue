<template>
  <div class="hello">
    <!-- 搭建html基本结构 -->
     <ul class="cj_box">
       <li 
         v-for="item in renderList" 
         :key="item.id"
         :class="{active:activeIndex === item.index}"
         @click="fn(item)"
        >
        <!-- {{item.text}} 数据应该由用户自己定义-->
        <!-- 具名插槽 -->
        <slot 
          name="item" 
          :itemData="item" 
          v-if="item.id!=='btn'"
          ></slot>
          <slot
            name="btn"
            v-else
          ></slot>
       </li>
     </ul>
  </div>
</template>

<script>
/* vue2.0实现 */
export default {
  name: 'HelloWorld',
  props: {
    /* 获取父组件传来的数据 */
    list:Array,
  },
  data(){
    return{
      activeIndex:null,
      cj:null,//控制中奖号码的索引
    }
  },
  methods:{
    fn(item){
      if (item.id !== 'btn') return;
      this.activeIndex = null;
      this.cj = null;
      setTimeout(()=>{
        /* 设置随机中奖索引 */
        this.cj = Math.floor(Math.random()*8);
      },1000);
      this.move(10)
    },
    move(time){
      /* 控制抽奖总时间 */
      if(time > 600){
        if(this.activeIndex !== this.cj){
           this.timer = setTimeout(()=>{
           let n = this.activeIndex + 1;
           this.activeIndex = n % 8;
           this.move(time+time*0.05);
          },time);
        }else{
          console.log("中奖了",this.cj)
        }
      }else{
        /* 核心处理 */
        this.timer = setTimeout(()=>{
        let n = this.activeIndex + 1;
        this.activeIndex = n % 8;
        this.move(time+time*0.1);
        },time);
      }
    }
  },
  computed:{
    //进行排序处理
    renderList(){
      let ary = this.list.map((item,index)=>{
        //更改排序顺序
        switch (index) {
          case 3:
            return{
              ...this.list[7],
              index:7
            }
          case 4:
            return{
              ...this.list[3],
              index:3
            }
          case 5:
            return{
              ...this.list[6],
              index:6
            }
          case 6:
            return{
              ...this.list[5],
              index:5
            }
          case 7:
            return{
              ...this.list[4],
              index:4
            }
          default:
            return{
              ...item,
              index:index
            }
        }
      })
      return ary.slice(0,4).concat({id:"btn",text:"开始抽奖"}).concat(ary.slice(4));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.cj_box{
  width: 80vw;
  height: 80vw;
  margin: auto;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  li {
    width: 25vw;
    height: 25vw;
    background: #eee;
  }
  li.active{
    background-color: rgb(233,159,159);
  }
}
</style>
