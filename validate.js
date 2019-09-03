import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';//引入中文文件
Vue.use(VeeValidate)

// 提示信息本地化
Validator.localize('zh_CN', {
    messages: zh_CN.messages,
    attributes: {
      name: '用户名',
      phone: '手机号',
      code: '验证码',
      captcha: '图形验证码',
      pwd: '密码'
    }
})

// 自定义验证规则
VeeValidate.Validator.extend('phone', {
    validate: value => {
      return /^1\d{10}$/.test(value)
    },
    getMessage: field => field + '必须是11位手机号码'
})
VeeValidate.Validator.extend('code', {
    validate: value => {
      return /\d{6}$/.test(value)
    },
    getMessage: field => field + '请输入正确格式的验证码'
})
VeeValidate.Validator.extend('captcha', {
    validate: value => {
      return /\w{0,4}$/.test(value)
    },
    getMessage: field => field + '请输入正确格式的图形验证码'
})







