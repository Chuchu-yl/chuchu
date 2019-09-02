import ajax from './ajax.js'
const BASE='/api'
// 获取经纬度位置
export const reqSite=(E,N)=>ajax(BASE+`/position/${N},${E}`)
// 获取食品分类
export const reqCategorys=()=>ajax(BASE+`/index_category`)
// 根据经纬度获取商铺
export const reqShops=(E,N)=>ajax(BASE+`/shops`,{N,E})