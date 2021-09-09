<template>
  <div id="cart">
  <NavBar class="cart-nav">
    <div slot="center" class="cart-text">购物车
      <span>({{this.$store.state.cartList.length}})</span>
    </div>
  </NavBar>
    <CartList></CartList>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import CartList from "./childcomps/CartList";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList
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