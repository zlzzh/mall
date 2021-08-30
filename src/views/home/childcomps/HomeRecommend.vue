<template>
   <div class="recommend">
        <div v-for="item in recommend" class="recommend-item">
          <a :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
          </a>
        </div>
   </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props:{
    recommend:[]
  }
}
</script>

<style scoped>
  .recommend {
    /*水平*/
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 15px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item {
    /*等分*/
    flex: 1;


  }
  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>