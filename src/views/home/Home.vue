<template>
    <div id="home">
      <nav-bar class="home-nav">
        <div slot="center">购物街</div>
      </nav-bar>
      <HomeSwiper v-bind:banners="banners"></HomeSwiper>
      <HomeRecommend :recommend="recommend"></HomeRecommend>
      <FeatureView></FeatureView>
      <TabControl class="TabControl" :titles="['流行','新款','精选']" @tabControl="tabControl"></TabControl>
      <GoodsList :goods="showGoodsList" ></GoodsList>
    </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import HomeSwiper from "./childcomps/HomeSwiper";
import HomeRecommend from "./childcomps/HomeRecommend";
import FeatureView from "./childcomps/FeatureView";
import TabControl from "../../components/comtent/tabcontrol/TabControl";

import GoodsList from "../../components/comtent/goods/GoodsList";
import {getHomeMultidata, getHomeData } from "../../network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList
  },
  data () {
    return {
      banners:[],
      recommend:[],
      goods:{
        'pop':{page: 0,list: [] },
        'new':{page: 0,list: [] },
        'sell':{page: 0,list: [] }
      },
      currentType: 'pop'
    }
  },
  computed: {
    showGoodsList() {
      return this.goods[this.currentType].list
    }
  },

  created() {
      this.getHomeMultidata();

      this.getHomeData('pop');
      this.getHomeData('new');
      this.getHomeData('sell');

  },
  methods:{
    /*
    *tabControl 监听事件
    */
    //'流行','新款','精选' 分类切换tabbar
    tabControl(index) {
      switch (index) {
          case 0:
            this.currentType = 'pop'
          break;
            case 1:
              this.currentType = 'new'
          break
          case 2:
            this.currentType = 'sell'
          break
      }
    },
    goodListBtn(index) {
      console.log(index);
    },
    /*
* 获取banners和recommend数据
* */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //console.log(res.data.data);
        this.banners = res.data.data.banner.list
        this.recommend = res.data.data.recommend.list
      }).catch((fal) => {
        console.log(fal)
      })
    },
    /*
    * 获取goodData数据
    * */
    getHomeData(type) {
      const page = this.goods[type].page + 1
      getHomeData(type,page).then(res =>{
        //console.log(res.data.data.list);
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  padding-bottom: 1000px;
}
.home-nav {
  background-color: magenta;
  color: #FFFFFF;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.TabControl {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>