<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-img" src="@/assets/img/tabbar/home.svg" alt="" />
      <img
        slot="item-icon-img"
        src="@/assets/img/tabbar/icon_home.svg"
        alt=""
      />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/categary">
      <img slot="item-img" src="@/assets/img/tabbar/categary.svg" alt="" />
      <img
        slot="item-icon-img"
        src="@/assets/img/tabbar/icon_categary.svg"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-img" src="@/assets/img/tabbar/cart.svg" alt="" />
      <img
        slot="item-icon-img"
        src="@/assets/img/tabbar/icon_cart.svg"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-img" src="@/assets/img/tabbar/my.svg" alt="" />
      <img slot="item-icon-img" src="@/assets/img/tabbar/icon_my.svg" alt="" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "../../components/common/TabBar.vue";
import TabBarItem from "../../components/common/TabBarItem";
export default {
  name: "MainTabBar",
  data() {
    return {};
  },
  components: { TabBar, TabBarItem },
};
</script>

<style>
</style>
