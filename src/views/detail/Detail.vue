<template>
 <div id="detail">
   <DetailNavBar class="DetailNavBar"></DetailNavBar>
   <BScroll :currentType="3"
            class="content"
            ref="BScroll">
     <DetailTopSwiper :topImage="topImage"></DetailTopSwiper>
     <DetailBaseInfo :goods="goods"></DetailBaseInfo>
     <DetailShopInfo :shop="shop"></DetailShopInfo>
     <DetailGoodsInfo :detailInfo="detailInfo" @imgLoad="imgLoad"></DetailGoodsInfo>
     <DetailParamInfo :paramInfo="paramInfo"></DetailParamInfo>
   </BScroll>

 </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import {getDetail ,
        Goods ,
        Shop ,
        GoodsParam } from "../../network/detail";
import DetailTopSwiper from "./childComps/DetailTopSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";

import BScroll from "../../components/common/scroll/BScroll";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailTopSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    BScroll
  } ,
  data() {
    return {
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    }
  },
  methods:{
    imgLoad() {
      this.$refs.BScroll.scroll.refresh()
    }
  },
  created() {
    getDetail(this.$route.params.id).then(res => {
      // 2.1.获取结果
      const data = res.data.result;

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
    })
  },

}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #FFF;
  height: 100vh;
}
.DetailNavBar {
  position: relative;
  z-index: 2;
  background-color: #FFF;
}
.content {
  height: calc(100% - 44px);
}
</style>