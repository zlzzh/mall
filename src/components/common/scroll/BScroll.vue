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
    //1.创建scroll对象
    this.scroll=new BScroll (this.$refs.wrapper,{
      probeType: this.currentType,
      pullUpLoad: this.currentLoad,
      click:true,
  })
    //2.监听滚动位置
    if (this.currentType === 2 || this.currentType === 3) {
      this.scroll.on('scroll',(position) => {
        this.$emit('scrollPosition',position)
      })
    }
    //3.上拉加载数据
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })

  },
  methods: {
    //1.如果scroll有值 再调用refresh 要不容易出现bug 报错
    scrollRefresh() {
      this.scroll && this.scroll.refresh()
    },
    //2.scroll 有值返回y坐标  没有返回0
    scrollToPositionY () {
      return this.scroll ? this.scroll.y : 0
    },
    //3.scroll滚动到指定位置appoint
    scrollToAppointPosition (index) {
      this.scroll.scrollTo(0,index,0)
    }
  }
}
</script>

<style scoped>

</style>