<template>
  <div class="tab-control-wrap">
    <div class="tab-control-item" v-for="(item,index) in titles" @click="btnItem(index)">
      <span :class="{active:index===currentIndex}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      currentIndex:0
    }
  },
  methods:{
    btnItem(index) {
      this.currentIndex = index;
      this.$emit('tabControl',index)
    }
  }
}
</script>
<style scoped>
.tab-control-wrap {
  display: flex;
  font-size: 15px;
  background-color: #FFFFFF;
}
.tab-control-item {
  flex: 1;
  text-align: center;
  height: 40px;
  line-height: 40px;
}

.active {
  color: magenta ;
  border-bottom: 3px solid magenta;
  padding-bottom: 4px;
}
</style>