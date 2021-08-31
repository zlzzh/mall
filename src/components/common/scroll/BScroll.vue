<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "BScroll",
  props: {
    currentType: 0,
    currentLoad:false
  },
  data() {
    return {
      scroll:''
    }
  },
  mounted() {
    //1.创建BSscroll对象
    this.scroll=new BScroll (this.$refs.wrapper,{
      probeType: this.currentType,
      pullUpLoad: this.currentLoad,
      click:true,
  })
    //2.记录监听位置
    this.scroll.on('scroll',(position) => {
      this.$emit('positionBtn',position)
    })
    //3.上拉加载数据
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })

  },
  methods: {
    getScrollY () {
      //有值取y坐标  没值返回0
      return this.scroll ? this.scroll.y : 0
    },
    scrollToPosition (index) {
      this.scroll.scrollTo(0,index,0)
    }
  }
}
</script>

<style scoped>

</style>