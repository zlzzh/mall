<template>
  <div>
    <Swiper class="top-swiper">
      <SwiperItem v-for="item in topImage" class="top-img">
        <img :src="item" alt="">
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import {Swiper , SwiperItem} from "../../../components/common/swiper/index";
export default {
  name: "DetailTopSwiper",
  components: {
    Swiper , SwiperItem
  },
  props: {
    topImage:[]
  }
}
</script>

<style scoped>
.top-swiper {
  height: 300px;
}
.top-img img {
}
</style>