<template>
  <div class="good-list">
   <GoodsItem v-for="(item,index) in goods" :goodItem="item" @click.native="goodsItemBtn(index)">
   </GoodsItem>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";
export default {
  name: "GoodsList",
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsItem
  },
  methods: {
    goodsItemBtn (index) {
      this.$emit('goodsItemBtn',index)
    }
  }

}
</script>

<style scoped>
.good-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>