<template>
    <div id="home">
      <nav-bar class="home-nav">
        <div slot="center">购物街</div>
      </nav-bar>
<!--      在navbar下面再写一个TabControl 目的吸顶效果，做一个假导航，监听滑动位置(mounted函数延迟执行，要不获取组件位置时不准，-->
<!--      有可能网络不好还没加载完 就取y轴位置了)，默认隐藏，当滑动到TabControl时 显示，-->
<!--      造成一种假象-->
      <TabControl class="TabControl"
                  :titles="['流行','新款','精选']"
                  @tabControl="tabControl"
                  ref="TabControl1"
                  v-show="isShowTabBar"
                  ></TabControl>
      <BScroll class="content"
               :currentType="3"
               ref="scroll"
               @positionBtn="positionBtn"
               :current-load="true"
               @pullingUp="pullingUp">
        <HomeSwiper v-bind:banners="banners"></HomeSwiper>
        <HomeRecommend :recommend="recommend"></HomeRecommend>
        <FeatureView></FeatureView>
        <TabControl :titles="['流行','新款','精选']" @tabControl="tabControl" ref="TabControl2"></TabControl>
        <GoodsList :goods="showGoodsList"
                   @goodsItemBtn="goodsItemBtn"></GoodsList>
      </BScroll>
<!--      对BackTop整个组件监听，而且必须加上native属性才生效-->
      <BackTop @click.native="backTopBtn" v-show="isShow"></BackTop>
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
import {getHomeMultidata, getHomeData } from "../../network/home";

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
  data () {
    return {
      banners:[],
      recommend:[],
      goods:{
        'pop':{page: 0,list: [] },
        'new':{page: 0,list: [] },
        'sell':{page: 0,list: [] }
      },
      currentType: 'pop',
      isShow: false,
      currentTabBarNum: 0,
      isShowTabBar: false,
      currentPosition: 0
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
  /*
  * activated和deactivated 函数记录离开时的位置，然后再回到页面的时候 直接toSroll到指定位置
  * */

  activated() {
    console.log(this.currentPosition);
    //直接to指定位置，并刷新
    this.$refs.scroll.scrollToPosition(this.currentPosition)
    this.$refs.scroll.scroll.refresh()
  },
  deactivated() {
    this.currentPosition = this.$refs.scroll.getScrollY()
  },
  mounted() {
    //延迟获取TabControl的y轴位置
    setTimeout (() => {
      this.currentTabBarNum = -this.$refs.TabControl2.$el.offsetTop
    },1000)

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
      //保证两个TabControl记录的index都是一致的 要不划自己记录自己的  就乱了 划下去点击的是流行  上面虚拟的还是新款呢
      this.$refs.TabControl1.currentIndex = index
      this.$refs.TabControl2.currentIndex = index
    },
    //返回顶部
    backTopBtn() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    //监听滚动位置
    positionBtn(position) {
      //backTop是否隐藏
      this.isShow = -position.y > 1000
      //tabControl是否吸顶
      this.isShowTabBar = -position.y > -this.currentTabBarNum
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
    goodsItemBtn (index) {
      console.log(this.currentType,index);
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