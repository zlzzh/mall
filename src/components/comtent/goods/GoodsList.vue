<template>
  <div class="good-list">
   <GoodsItem v-for="(item,index) in goods" :goodItem="item">
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