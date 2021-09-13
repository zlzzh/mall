<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
export default {
  name: "toast",
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message = '默认文字',duration = 2000) {
      this.message = message;
       this.isShow = true;
       setTimeout(() => {
         this.isShow = false;
         this.message = ''
       },duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    color: #FFFFFF;
    background-color: rgba(0,0,0,0.6);
    border-radius: 5px;
    z-index: 999;
  }
</style>