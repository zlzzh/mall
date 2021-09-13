<template>
 <div id="detail">
   <DetailNavBar class="DetailNavBar" @detailNavBarClick="detailNavBarClick" ref="nav"></DetailNavBar>
   <BScroll :currentType="3"
            class="content"
            ref="scroll"
            @scrollPosition="scrollPosition">
     <DetailTopSwiper :topImage="topImage"></DetailTopSwiper>
     <DetailBaseInfo :goods="goods"></DetailBaseInfo>
     <DetailShopInfo :shop="shop"></DetailShopInfo>
     <DetailGoodsInfo :detailInfo="detailInfo" @imgLoad="imgLoad"></DetailGoodsInfo>
     <DetailParamInfo :paramInfo="paramInfo" ref="paramInfo"></DetailParamInfo>
     <DetailCommentInfo :commentInfo="commentInfo" ref="commentInfo"></DetailCommentInfo>
     <GoodsList :goods="recommendInfo" ref="recommendInfo"></GoodsList>
   </BScroll>
   <BackTop @click.native="backTopBtn" v-show="isBackShow"></BackTop>
   <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
 </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import {getDetail ,
        getRecommend,
        Goods ,
        Shop ,
        GoodsParam } from "../../network/detail";
import DetailTopSwiper from "./childComps/DetailTopSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "../../components/comtent/goods/GoodsList";
import {imageLoadMixIN} from "../../common/mixin";
import DetailBottomBar from "./childComps/DetailBottomBar";
import BackTop from "../../components/comtent/backtop/BackTop";

import BScroll from "../../components/common/scroll/BScroll";
import {debounce} from "../../common/until";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailTopSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    BScroll
  } ,
  data() {
    return {
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      imgLoadListener: null,
      themeTopY: [],
      getThemeTopYs: null,
      isBackShow: false
    }
  },
  mixins: [imageLoadMixIN],
  methods:{
    imgLoad() {
      // 1.防抖刷新
      debounce(() =>{
        this.$refs.scroll.scrollRefresh()
      },500)
      // 2.防抖 获取主题y坐标高度
      this.getThemeTopYs()
      // console.log('------');
    },
    detailNavBarClick(index) {
      //console.log(index);
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopY[index],500)
    },
    //监听位置 滑动页面修改Nav index
    scrollPosition(position) {
      if (-position.y < this.themeTopY[1] && -position.y) {
        this.$refs.nav.currentIndex = 0
      }
      else if (-position.y >= this.themeTopY[1] && -position.y < this.themeTopY[2] ) {
         this.$refs.nav.currentIndex = 1
      }
      else if (-position.y >= this.themeTopY[2] && -position.y < this.themeTopY[3] ) {
        this.$refs.nav.currentIndex = 2
      }
      else if (-position.y >= this.themeTopY[3]) {
        this.$refs.nav.currentIndex = 3
      }
      //1.backTop按钮 当滚动位置> 1000时  isShow:ture 显示
      this.isBackShow = -position.y > 1000
    },
    backTopBtn() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    addToCart() {
      //console.log('添加购物车');
      //1.添加购物车信息
      const product = {};
      product.image = this.topImage[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.lowNowPrice
      product.iid = this.$route.params.id
      product.count = 0
      product.checked = true
      // 不能这样写 必须通过mutations改变state this.$store.state.cartList.push(product)
      this.$store.dispatch('addToCart',product).then(res => {
        this.$toast.show(res,2000)
      })



    }
  },
  created() {
    getDetail(this.$route.params.id).then(res => {
      // 2.1.获取结果
      const data = res.data.result;
      //console.log(data);
      // 2.2.获取顶部信息
      this.topImage = data.itemInfo.topImages;

      // 2.3.获取商品信息1
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      // 2.4.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 2.5.获取商品信息2
      this.detailInfo = data.detailInfo
      // 2.6.保存参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      // 2.7获取评论信息
      if (data.rate.cRate.lenght !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    }),
    //2.8获取推荐信息
    getRecommend().then(res => {
      const data = res.data.data
      this.recommendInfo = data.list
    }),
        //保存获取主题元素坐标  防抖
    this.getThemeTopYs = debounce(() => {
      this.themeTopY = []
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.paramInfo.$el.offsetTop)
      this.themeTopY.push(this.$refs.commentInfo.$el.offsetTop)
      this.themeTopY.push(this.$refs.recommendInfo.$el.offsetTop)
      // console.log(this.themeTopY);
    },500)
  },
  mounted() {

  },
  destroyed() {
    //销毁时 取消监听事件
    this.$bus.$off('goodItemImgClick',this.imgLoadListener)
  }

}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #FFF;
  /*屏幕高度 100%*/
  height: 100vh;
}
.DetailNavBar {
  position: relative;
  z-index: 2;
  background-color: #FFF;
}
.content {
  /*给batterScroll一个高度 相对整个屏幕高度-导航44px*/
  height: calc(100% - 44px - 49px);
}
</style>