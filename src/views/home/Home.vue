<template>
    <div class="home">
      <nav-bar class="home-nav">
        <div slot="center">购物街</div>
      </nav-bar>
      <Swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="">
          </a>
        </swiper-item>
      </Swiper>
    </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import {getHomeMultidata} from "../../network/home";
import {Swiper,SwiperItem} from "../../components/common/swiper/index"
export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      banners:[],
      recommend:[]
    }
  },
  created() {
    getHomeMultidata().then((res) => {
      this.banners = res.data.data.banner.list
      this.recommend = res.data.data.recommend.list
    }).catch((fal) => {
      console.log(fal)
    })

  }
}
</script>

<style scoped>
.home-nav {
  background-color: magenta;
  color: #FFFFFF;
}
</style>