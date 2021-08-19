<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {};
  },
  components: {},
};
</script>

<style>
#tab-bar {
  /*flex 水平 flow 垂直*/
  display: flex;
  background-color: #f6f6f6;
  /*位置固定,左边、右边、底部距离都为0*/
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /*tab-bar分割线阴影*/
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
}

</style>
