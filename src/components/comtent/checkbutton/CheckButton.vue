<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="../../../../src/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
}
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check {
  background-color: magenta;
  border: 2px solid magenta;

}
</style>