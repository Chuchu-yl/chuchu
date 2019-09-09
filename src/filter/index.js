/**
 * 
 * 自定义过滤器模块，设置时间格式
 */

 import Vue from 'vue'
 import format from 'date-fns'
 // 日期格式化过滤器: date-format
Vue.filter('date-format', (value, formatStr) => {
    return format(value, formatStr || 'YYYY-MM-DD HH:mm:ss')
})