<template>
 <div class="goods-item" @click="goodsItemBtn">

   <img :src="goodItem.show.img" alt="">
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
  methods:{
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