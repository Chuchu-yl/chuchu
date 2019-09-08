<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUL">
          <li
            class="menu-item"
            :class="{current:currentIndex===index}"
            v-for="(good,index) in goods"
            :key="index"
            @click="clickItem(index)"
          >
            <img class="icon" :src="good.icon" v-show="good.icon" />
            <span class="text bottom-border-1px">{{good.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <!-- 把ref写在ul中是因为，这样可以更好的获取到总的li的长度 -->
        <ul ref="rightUL">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food,index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.image" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food"></Food>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Food from "./Food.vue";
import ShopCart from './ShopCart.vue'
// 引入better-scoll插件
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scrollY: 0,
      tops: [],
      // 先存一个空对象
      food:{}  // 向food组件中传入数据
    };
  },
  components: {
    Food,
    ShopCart
  },
  computed: {
    ...mapState({
      goods: state => state.shop.goods
    }),
    currentIndex() {
      const { scrollY, tops } = this;
      // findIndex找出第一个满足条件返回true元素的下标
      let index = tops.findIndex(
        (top, index) => scrollY >= top && scrollY < tops[index + 1]
      );
      // console.log(index);
      // console.log(scrollY);
      // 判断当前索引值是否等于左侧的索引
      if (this.index != index && this.scrollLeft) {
        // 在this上挂载index,不一致的时候，让它一致
        this.index = index;
        // 获取左侧li的高度
        // 找到当前的li标签
        const li = this.$refs.leftUL.children[index];

        // this.leftUL.scrollTo(0,y,300)
        // 滚动到当前元素，判断当前的this.scrollLeft存在不存在
        this.scrollLeft.scrollToElement(li, 300);
      }

      return index;
    }
  },
  async mounted() {
    await this.$store.dispatch("getGoods");
    // new 必须在页面加载完毕之后才可以，所以写await async(老版本需要写这个，现在的不需要)
    // 自定义的滑动方法_
    this._initBscoll();
    // 定义tops里面的值
    this._initTops();
  },
  methods: {
    _initBscoll() {
      // 左侧列表
      this.scrollLeft = new BScroll(".menu-wrapper", {
        // 设置是否可以点击，（默认为false）
        click: true
        // probeType:3 费电
        /**
         * 1：非实时,触摸滑动
         * 2: 实时的,触摸滑动,编码滑动
         * 3: 实时的,触摸滑动,编码滑动,惯性
         * 实时:时间间隔非常短
         * 非实时:时间间隔非常的长
         **/
      });
      // 右侧列表
      this.scrollRight = new BScroll(".foods-wrapper", {
        click: true,
        probeType: 1
      });

      // 对右侧列表进行设置
      this.scrollRight.on("scroll", ({ x, y }) => {
        // console.log(y);
        this.scrollY = Math.abs(y);
      }),
        // 当滑动结束的时候，坐标不计算了
        this.scrollRight.on("scrollEnd", ({ x, y }) => {
          this.scrollY = Math.abs(y);
        });
    },
    _initTops() {
      const { tops } = this;
      let top = 0;
      // tops数组的索引为0的值是0
      tops.push(top);
      /*获取右边列表的每一项li的长度存入数组中*/
      // 获取到总的li
      const list = this.$refs.rightUL.children;
      // 把每一个li遍历，获取每一个li的长度（因为li中会有foods这个数组，被内容撑起来，有长度）
      // list 是伪数组，需要通过特殊方式进行遍历
      Array.prototype.slice.call(list).forEach(li => {
        // let liTop=li.clientHeight
        top += li.clientHeight;
        tops.push(top);
      });
      // console.log(tops);
    },
    clickItem(index) {
      // 点击左边的列表，右边显示
      const scrollY = this.tops[index];
      this.scrollY = scrollY;
      console.log(scrollY);
      // scrollY是负数上走
      this.scrollRight.scrollTo(0, -scrollY, 300);
    },
    showFood(food){
      this.$refs.food.clickFood()
      // 在显示Food组件的时候，把最新的food对象传入food组件中
      this.food=food
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixins.styl'
.goods
  display flex
  position absolute
  top 225px
  bottom 46px
  width 100%
  background #fff
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        color $green
        font-weight 700
        .text
          border-none()
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
      .text
        display table-cell
        width 56px
        vertical-align middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>;
