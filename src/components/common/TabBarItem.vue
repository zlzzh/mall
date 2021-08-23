<template>
  <div class="tab-bar-item" v-on:click="itemBtn">
    <div v-if="!isActive"><slot name="item-img"></slot></div>
    <div v-else><slot name="item-icon-img"></slot></div>
    <div :class="{ active: isActive }"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
  },
  data() {
    return {

    }
  },
  computed: {
    isActive () {
       return this.$route.path.indexOf(this.path)!== -1
    }
  },
  methods: {
    itemBtn() {
      this.$router.push(this.path).catch((err) => err)
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  /* 自适应 均等分 */
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 12px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  /*图片距离顶部3px*/
  margin-top: 3px;
  /*取消图片下面自带的3px，使文字和图片紧挨着*/
  vertical-align: middle;
  margin-bottom: 2px;
}
.active {
  color: magenta;
}
</style>