<template>
  <div id="app">
   <div><slot name="item_img"></slot></div>
   <div><slot name="item_text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "MainTabBar",
  data() {
    return {
       isActive:true
    }
  },
  components: {
  }
}
</script>

<style>
</style>
