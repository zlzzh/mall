<template>
  <div class="cart-list">
    <BScroll class="content" ref="scroll">
       <CartListItem v-for="(item,index) in cartList"
                     :itemInfo="item"
                     :key="index">
       </CartListItem>
    </BScroll>
  </div>
</template>

<script>
import BScroll from "../../../components/common/scroll/BScroll";
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  components: {
    BScroll,
    CartListItem
  },
  data() {
    return {
      cartList: []
    }
  },
  created() {
    this.cartList = this.$store.state.cartList
  },
  activated() {
    this.$refs.scroll.scrollRefresh()
  }

}
</script>

<style scoped>
  .cart-list {
    height: calc(100vh - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>