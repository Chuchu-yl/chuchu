<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{'on':loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{'on':!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{'on':loginWay}">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
                name="phone"
                v-validate="'required|phone'"
              />
              <span style="color:red" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              <!-- computeTimer>0是为了让他在发送请求的时间内不被点击 -->
              <button
                class="get_verification"
                :disabled="!isRightPhone || computeTimer>0"
                :class="{right_phone_num:isRightPhone}"
                @click.prevent="sendCode"
              >{{computeTimer > 0 ? `已发送${computeTimer}s`: "发送验证码"}}</button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                name="code"
                v-model="code"
                v-validate="'required|code'"
              />
              <span style="color:red" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{'on':!loginWay}">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  name="name"
                  v-model="name"
                  v-validate="'required'"
                />
                <span style="color:red" v-show="errors.has('name')">{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <input
                  :type="isShowPwd?'text':'password'"
                  maxlength="8"
                  placeholder="密码"
                  name="pwd"
                  v-model="pwd"
                  v-validate="'required'"
                />
                <span style="color:red" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                <div
                  class="switch_button"
                  :class="isShowPwd ? 'on':'off'"
                  @click="isShowPwd=!isShowPwd"
                >
                  <div class="switch_circle" :class="{'right':isShowPwd}"></div>
                  <span style="color:red" class="switch_text">{{isShowPwd ? 'abc' : '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  name="captcha"
                  v-model="captcha"
                  v-validate="'required|captcha'"
                />
                <span style="color:red" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                <img
                  class="get_verification"
                  ref="pic"
                  src="http://localhost:5000/captcha"
                  alt="captcha"
                  @click="getPic"
                />
              </section>
            </section>
          </div>
          <button @click.prevent="login" class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back('/profile')">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
import { reqCode, reqLoginPhoneCode, reqLoginUserPwd } from "../../api";
// import { clearInterval } from 'timers'
export default {
  data() {
    return {
      // 切换登录方式
      loginWay: true, // true 的话是短信登录，false的话是密码登录
      // 存储手机号码
      phone: "",
      computeTimer: 0,
      // 是否展示密码
      isShowPwd: false,
      code: "", // 短信验证码
      name: "", // 用户名
      captcha: "", // 图形验证码
      pwd: "" // 密码
    };
  },
  computed: {
    // 是否输入了正确的电话号码
    isRightPhone() {
      return /[1]\d{10}/.test(this.phone);
    }
  },
  methods: {
    async sendCode() {
      this.computeTimer = 10;
      this.timerId = setInterval(() => {
        this.computeTimer--;
        if (this.computeTimer < 0) {
          clearInterval(this.timerId);
        }
      }, 1000);
      // 发送短信验证码
      const result = await reqCode(this.phone);
      if (result.code === 0) {
        alert("验证码发送成功");
      } else {
        alert("验证码发送失败");
        // 发送失败的时候，定时器取消计时，并且时间归 0
        this.computeTimer = 0;
        clearInterval(this.timerId);
      }
    },
    getPic() {
      // 选中img元素
      this.$refs.pic.src = "http://localhost:5000/captcha?q=" + Date.now();
    },
    // 登录按钮
    async login() {
      // 第一步，进行表单验证
      let names; // names为数组，存放相应界面的表单信息
      let { phone, code, name, pwd, captcha } = this;
      //this,$validator.validateAll(数组)==> 验证表单是否全部通过，验证通过，则返回true，否则返回false。
      // 把他们存到数组里是把对应页面的信息进行验证，而不用全部验证
      if (this.loginWay) {
        names = ["phone", "code"];
      } else {
        names = ["name", "pwd", "captcha"];
      }
      await this.$validator.validateAll(names);
      // 判断，如果是短信登录，发送相应的请求

      if (this.loginWay) {
        const result = await reqLoginPhoneCode(phone, code);
        if (result.code === 0) {
          // 登录成功，跳转到个人中心
          alert("成了");
        } else {
          alert("登录失败");
        }
      } else {
        const result = reqLoginUserPwd({ name, pwd, captcha });
        if (result.code === 0) {
          alert("成功");
        } else {
          alert("登录失败");
        }
      }
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone_num
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.right
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
