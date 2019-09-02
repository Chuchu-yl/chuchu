<template>
  <div>
    <router-view></router-view>
    <!-- 为true的话底部显示，false的话底部不显示 -->
    <FooterGuide v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import {reqSite} from './api'
export default {
  components: {
    FooterGuide
  },
 async mounted(){
    const result=await reqSite("116.36867", "40.10038")
    if(result.code===0){
      console.log(result.data)
    }
  }
}
</script>

<style>
</style>
