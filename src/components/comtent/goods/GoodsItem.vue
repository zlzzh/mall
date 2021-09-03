<template>
 <div class="goods-item" @click="goodsItemBtn">

   <img :src="showGoodsItem" alt="" @load="goodItemImgClick">
   <div class="goods-info">
     <p>{{goodItem.title}}</p>
     <img src="../../../assets/img/common/price.svg" alt="">
     <span class="price">{{goodItem.price}}</span>
     <img src="../../../assets/img/common/collect.svg" alt="">
     <span class="collect">{{goodItem.cfav}}</span>
   </div>

 </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props:{
    goodItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showGoodsItem() {
      return this.goodItem.image || this.goodItem.show.img
    }
  },
  methods:{
    goodItemImgClick() {
      //$bus 事件总线 类似通知  可以跨组件传递 发送this.$bus.$emit  接收this.$bus.on  $bus需要再main.js里面定义
      this.$bus.$emit('goodItemImgClick')
    },
    goodsItemBtn() {
      this.$router.push('/detail/' + this.goodItem.iid)
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: magenta;
  margin-right: 20px;
}
.goods-info img {
  width: 15px;
  height: 15px;
  /*去图片底部多余的像素*/
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>