<template>
   <div class="bottom-bar">
     <div class="check-content">
       <CheckButton class="check-button" :isChecked="isSelectAll" @click.native="checkClick"></CheckButton>
       <span>全选</span>
     </div>
     <div class="price">
       合计：{{totalPrice}}
     </div>
     <div class="calculate" @click="emitCalculate">
       去计算：{{totalCount}}
     </div>
   </div>
</template>

<script>
import CheckButton from "../../../components/comtent/checkbutton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    //reduce 对数组数据求和
    totalPrice () {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
          },0).toFixed(2)
    },
    totalCount () {
      return this.$store.state.cartList.filter(function (n) {
          return n.checked
      }).length
    },
    // isSelectAll() {
    //    return !this.$store.state.cartList.find(item => !item.isChecked)
    // }
    isSelectAll: function () {
      // 1.find 没被选中的 返回true 然后再取反 返回false  只要有一个checked为false 就返回false
      // if (this.$store.state.cartList.length===0){
      //   return false
      // } else {
      //   return !this.$store.state.cartList.find(item => !item.checked )
      // }

      //2.利用some  找到一个checked==false 那么就返回ture 最后取反
      // return !this.$store.state.cartList.some(item => {return item.checked == false})

      //3.ever 查找数据 必须每一个的checked==true 才返回ture 有一个为false 则返回false
      if (this.$store.state.cartList.length === 0) return false
      else
      return this.$store.state.cartList.every(item => {return item.checked == true})

    }
  },
  methods: {
    emitCalculate() {
      console.log('向服务器发送结算信息');
    },
    checkClick() {
      // 1.判断是否有未选中的按钮
      let isSelectAll = this.$store.state.cartList.find(item => !item.checked);
      // 2.有未选中的内容, 则全部选中
      if (isSelectAll) {
        this.$store.state.cartList.forEach(item => {
          item.checked = true;
        });
      } else {
        this.$store.state.cartList.forEach(item => {
          item.checked = false;
        });
      }
    }

  },

}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 16px;
  height: 16px;
  line-height: 16px;
  margin-right: 5px;
}
.price {
  margin-left: 30px;
}
.calculate {
  position: absolute;
  width: 100px;
  right: 0;
  text-align: center;
   background-color: magenta;
}
</style>