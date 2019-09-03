import ajax from './ajax.js'
const BASE='/api'
// 获取经纬度位置
export const reqSite=(E,N)=>ajax(BASE+`/position/${N},${E}`)
// 获取食品分类
export const reqCategorys=()=>ajax(BASE+`/index_category`)
// 根据经纬度获取商铺
export const reqShops=(E,N)=>ajax(BASE+`/shops`,{N,E})
// 发送短信验证码
export const reqCode=(phone)=>ajax(BASE+`/sendcode`,{phone})
// 用户密码登录
export const reqLoginUserPwd=({name,pwd,captcha})=>ajax(BASE+`/login_pwd`,{name,pwd,captcha},'POST')
// 手机号验证码登陆
export const reqLoginPhoneCode=(phone,code)=>ajax(BASE+`/login_sms`,{phone,code},'POST')
// 用户登出
export const reqLogout=()=>ajax(BASE+`/logout`)
// 根据会话获取用户信息,自动登录的功能
export const reqUserInfo=()=>ajax(BASE+`/userinfo`)