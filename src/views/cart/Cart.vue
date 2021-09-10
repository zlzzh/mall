<template>
  <div id="cart">
<!--    1.导航-->
  <NavBar class="cart-nav">
    <div slot="center" class="cart-text">购物车
      <span>({{this.$store.state.cartList.length}})</span>
    </div>
  </NavBar>
<!--    2.列表展示-->
    <CartList></CartList>
<!--    3.底部结算-->
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import CartList from "./childcomps/CartList";
import CartBottomBar from "./childcomps/CartBottomBar";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
}
</script>

<style scoped>
  .cart-nav {
  background-color: magenta;
  color: #FFFFFF;
}
.cart-text span {
   color: #FFFFFF;
}
</style>