<template>
  <div>
    <router-view></router-view>
    <!-- 为true的话底部显示，false的话底部不显示 -->
    <FooterGuide v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import {reqUserInfo} from './api'
import {RECEIVE_USER} from './store/mutation-types'
export default {
  components: {
    FooterGuide
  },
 // 只用分发一次，所以写在App中
 async mounted(){
    // 页面首次加载，直接发送请求，获取信息
    // 分发action给服务器请求，获取信息
    this.$store.dispatch('getAddress')
    // this.$store.dispatch('getGoods')
    
    // 自动登录
    const result = await reqUserInfo()
    if(result.code===0){
      const user=result.data
      this.$store.commit(RECEIVE_USER,user)
    }
  }
}
</script>

<style>
</style>
