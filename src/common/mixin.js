import {debounce} from "./until";

export const  imageLoadMixIN = {
   mounted() {
     //1.当首页goodItem图片加载完成 利用防抖函数 refresh 优化性能
     const refresh = debounce(() => {
       this.$refs.scroll.scrollRefresh()
     }, 500)
     //2.保存callback 监听函数
     this.imgLoadListener = () => {
       refresh()
     }
     //3.this.$bus.$on 监听
     this.$bus.$on('goodItemImgClick', this.imgLoadListener
     )
   }

}