<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="">
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
  components:{
    Swiper,SwiperItem
  }
}
</script>

<style scoped>

</style>