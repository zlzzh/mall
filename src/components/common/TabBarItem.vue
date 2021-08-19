<template>
  <div class="tab-bar-item">
     <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
    };
  },
  components: {},
};
</script>

<style>
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
</style>
