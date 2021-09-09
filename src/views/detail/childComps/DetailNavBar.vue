<template>
  <div>
    <nav-bar>
      <div slot="left" @click="barBackClick" class="back_img">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="nav-bar">
        <div v-for="(item,index) in titles"
             class="bar-item"
             @click="barItemBtn(index)"
             :class="{isActive:index === currentIndex}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles:['商品','参数','评论','推荐',],
      currentIndex:0
    }
  },
  components: {
    NavBar
  },

  methods: {
    barItemBtn (index) {
      this.currentIndex = index
      this.$emit('detailNavBarClick',index)

    },
    barBackClick () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.nav-bar {
  display: flex;
}
.bar-item {
  flex: 1;
  font-size: 15px;
}
.isActive {
  color: magenta;
}
.back_img img {
  width: 20px;
  height: 20px;
  padding-top: 14px;
}
</style>