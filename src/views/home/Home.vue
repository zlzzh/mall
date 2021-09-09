<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--在navbar下复制一个TabControl 目的吸顶效果，做一个假导航，监听滑动位置默认隐藏，当滑动到TabControl时 显示，造成一种假象-->
    <TabControl class="TabControl"
                :titles="['流行','新款','精选']"
                @tabControl="tabControl"
                ref="TabControl1"
                v-show="isShowTabBar"
    ></TabControl>
    <BScroll class="content"
             :currentType="3"
             ref="scroll"
             @scrollPosition="scrollPosition"
             :current-load="true"
             @pullingUp="pullingUp">
      <HomeSwiper v-bind:banners="banners" @homeSwiperImageLoad="homeSwiperImageLoad"></HomeSwiper>
      <HomeRecommend :recommend="recommend"></HomeRecommend>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行','新款','精选']" @tabControl="tabControl" ref="TabControl2"></TabControl>
      <GoodsList :goods="showGoodsList"></GoodsList>
    </BScroll>
    <!--对BackTop整个组件监听，而且必须加上native属性才生效-->
    <BackTop @click.native="backTopBtn" v-show="isBackShow"></BackTop>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import HomeSwiper from "./childcomps/HomeSwiper";
import HomeRecommend from "./childcomps/HomeRecommend";
import FeatureView from "./childcomps/FeatureView";

import TabControl from "../../components/comtent/tabcontrol/TabControl";
import BScroll from "../../components/common/scroll/BScroll";
import BackTop from "../../components/comtent/backtop/BackTop";

import GoodsList from "../../components/comtent/goods/GoodsList";
import {getHomeMultidata, getHomeData} from "../../network/home";
import {imageLoadMixIN} from "../../common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    BScroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isBackShow: false,
      isShowTabBar: false,
      tabOffSetTop: 0,
      currentPositionY: 0,
      imgLoadListener: null
    }
  },
  mixins: [imageLoadMixIN],
  computed: {
    // 根据记录的currentType 取对应类型的数组
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

  activated() {
    //1.活跃时 滚动到记录的y坐标位置并refresh
    this.$refs.scroll.scrollToAppointPosition(this.currentPositionY)
    this.$refs.scroll.scrollRefresh()
  },
  deactivated() {
    //1.不活跃时(点击进入detail),记录y坐标
    this.currentPositionY = this.$refs.scroll.scrollToPositionY()

    //2.离开时 取消事件总线监听  和详情页互不干扰
    this.$bus.$off('goodItemImgClick',this.imgLoadListener)
  },

  mounted() {

  },

  methods: {
    /*----------监听事件----------*/

    //轮播图加载完 后获取TabControl2 y位置
    homeSwiperImageLoad() {
      this.tabOffSetTop = -this.$refs.TabControl2.$el.offsetTop

    },
    //监听滚动位置
    scrollPosition(position) {
      //1.backTop按钮 当滚动位置> 1000时  isShow:ture 显示
      this.isBackShow = -position.y > 1000
      //2.假导航  当滚动位置 > tabOffSetTop时 isShowTabBar:true 显示
      this.isShowTabBar = -position.y > -this.tabOffSetTop
    },

    //点击 将index赋值给currentType记录点击类型['流行','新款','精选']
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
      //保证两个TabControl记录的index都是一致的 要不划自己记录自己的  就乱了 划下去点击的是流行  上面虚拟的还是新款呢
      this.$refs.TabControl1.currentIndex = index
      this.$refs.TabControl2.currentIndex = index
    },
    //返回顶部 500毫秒
    backTopBtn() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },

    //加载更多
    pullingUp() {
      //根据当前currentType 发送网络请求
      this.getHomeData(this.currentType)
      //需要调用finishPullUp函数 否则不能再次上拉加载
      this.$refs.scroll.scroll.finishPullUp()
      //刷新页面，因为图片都是异步加载，如果加载的数据比计算的速度慢，高度算完了，图片还没加载呢 better-scroll无法确定具体高度，不能滚动
      this.$refs.scroll.scroll.refresh()
    },

    /*----------网络请求获取banners和recommend----------------*/
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //console.log(res.data.data);
        this.banners = res.data.data.banner.list
        this.recommend = res.data.data.recommend.list
      }).catch((fal) => {
        console.log(fal)
      })
    },
    /*----------网络请求获取goodData------------*/
    getHomeData(type) {
      const page = this.goods[type].page + 1
      getHomeData(type, page).then(res => {
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
  height: 100vh;
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
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 9;
}

.content {
  height: calc(100% - 93px);
  overflow: hidden;
}
</style>