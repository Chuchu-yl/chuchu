<template>
  <div>
    <router-view></router-view>
    <!-- 为true的话底部显示，false的话底部不显示 -->
    <FooterGuide v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  components: {
    FooterGuide
  },
 // 只用分发一次，所以写在App中
  mounted(){
    // 页面首次加载，直接发送请求，获取信息
    // 分发action给服务器请求，获取信息
    this.$store.dispatch('getAddress')
  }
}
</script>

<style>
</style>
