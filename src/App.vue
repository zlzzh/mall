<template>
  <div id="app">
     <tab-bar>
       <tab-bar-item>
         <img slot="item_icon_imge" src="@/assets/img/tabbar/icon_home.svg" alt="">
         <div>首页</div>
       </tab-bar-item>
       <tab-bar-item>
         <img slot="item_icon_imge" src="@/assets/img/tabbar/icon_categary.svg" alt="">
         <div>分类</div>
       </tab-bar-item>
    
     </tab-bar>
  </div>
</template>

<script>
import TabBar from './components/common/TabBar.vue';
import TabBarItem from './components/common/TabBarItem.vue';
import MainTabBar from './components/comtent/MainTabBar.vue';

export default {
  name: "App",
  components: {TabBar, TabBarItem, MainTabBar},
};
</script>

<style>
@import "assets/css/normalize.css";

</style>
