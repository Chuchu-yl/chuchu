<template>
  <!--首页外卖-->

  <section class="msite">
    <Header :title="address.name || '正在定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- 遍历一个数组，里面有两个div,div在再遍历，分别有两组放内容的数组 -->
          <div class="swiper-slide" v-for="(catagorys,index) in catagoryArr" :key="index">
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(catagory,index) in catagorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="`https://fuss10.elemecdn.com`+catagory.image_url" />
              </div>
              <span>{{catagory.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <ShopList />
  </section>
</template>
<script>
import ShopList from "../../components/ShopList/ShopList";
import Swiper from "swiper";
import { mapState } from "vuex";
// 需要引入css
import "swiper/dist/css/swiper.css";
export default {
  components: {
    ShopList
  },
 async mounted() {
    this.$store.dispatch("getShops");
    // 获取食品分类的信息
   await this.$store.dispatch("getCategorys");
    // 等待数据获取成功后，轮播图生效
    // 数据有了,界面渲染完毕了,才能new实例对象----轮播图才有效果
      new Swiper(".swiper-container", {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        }
      })
    // this.$nextTick(() => {
      
    // });
  },
  computed: {
    // 获取到状态,进行操作
    ...mapState(["address", "categorys"]),
    catagoryArr() {
      // 获取状态中的食品分类的数组
      const { categorys } = this;
      let wrapArr = [];
      let innerArr = [];
      categorys.forEach(category => {
        // 先判断里面的数组中是否有数据，要是没有的话，把里面的数组放到外面的数组中去
        if (innerArr.length === 0) {
          wrapArr.push(innerArr);
        }
        // 把里面的数组中添加食品分类的每一项
        innerArr.push(category);
        // 如果里面的数组的长度等于8，就把这个数组设为空数组，再继续存放内容,直到放完16个为止
        if (innerArr.length === 8) {
          innerArr = [];
        }
      });
      return wrapArr;
    }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl'
.msite // 首页
  width 100%
  .header
    background-color #02a774
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%
      .icon-sousuo
        font-size 25px
        color #fff
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center
      .header_title_text
        font-size 20px
        color #fff
        display block
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        color #fff
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        span.swiper-pagination-bullet-active
          background #02a774
</style>

