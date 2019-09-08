<template>
  <div class="cartcontrol">
    <div
      class="iconfont icon-remove_circle_outline"
      v-show="food.count > 0 "
      @click.stop="updateFooodCount(false)"
    >
		</div>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click.stop="updateFooodCount(true)"></div>
  </div>
</template>
<script>
export default {
  // 接收food数据，在这里进行设置，food需要goods组件传入
  props: {
    food: Object
  },
  methods: {
    updateFooodCount(isAdd) {
			// true的话是增加，false的话是减少
			// 携带过去isAdd与 当前点击的food
			this.$store.dispatch('foodCount',{isAdd,food:this.food})
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.cartcontrol
  font-size 0
  .cart-decrease
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 160, 220)
  .icon-remove_circle_outline
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color $green
  .cart-count
    display inline-block
    vertical-align top
    width 12px
    padding-top 6px
    line-height 24px
    text-align center
    font-size 10px
    color rgb(147, 153, 159)
  .icon-add_circle
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color $green
</style>
