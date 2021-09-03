<template>
  <swiper>
    <swiper-item v-for="item in banners" >
      <a :href="item.link">
        <img :src="item.image" alt="" @load="homeSwiperLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "../../../components/common/swiper/index"
export default {
  name: "HomeSwiper",
  props:{
    banners:[]
  },
  data() {
    return {
      isLoad: true
    }
  },
  components:{
    Swiper,SwiperItem
  },
  methods: {
    homeSwiperLoad() {
      //加判断 发送一次后 设置isLoad:false 这样就只$emit一次
      if (this.isLoad) {
        this.$emit('homeSwiperImageLoad')
        this.isLoad = false
      }
    }
  }
}
</script>

<style scoped>

</style>