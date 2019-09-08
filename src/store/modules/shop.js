import {RESEIVE_GOODS,RESEIVE_RATINGS,RECEIVE_INFO,ADD_FOOD_COUNT,REMOVE_FOOD_COUNT} from '../mutation-types'
import {reqGoods,reqRatings,reqInfo} from '../../api'
import Vue from 'vue'
const state={
    //商家相关
    goods:[],
    ratings:[],
    info:{},
    // 在购物车中存储食物对象的数组
    foodArr:[]
}
const mutations={
    [RESEIVE_GOODS](state,{goods}){
        state.goods=goods
    },
    [RESEIVE_RATINGS](state,{ratings}){
        state.ratings=ratings
    },
    [RECEIVE_INFO](state,{info}){
        state.info=info
    },
    [ADD_FOOD_COUNT](state,{food}){
        // food中没有count的时候，点击添加，显示1
        if(!food.count){
            // food.count=1
            // 为响应式对象中添加一个属性，并确保新属性同样是响应式的，触发视图更新
            Vue.set(food,'count',1)
            // 把当前的food，添加到foodAr数组中
            state.foodArr.push(food)
        }else{
            // 有值的话
            food.count ++
        }
    },
    [REMOVE_FOOD_COUNT](state,{food}){
        if(food.count>0){
            food.count--
            // 如果当前食物的数量等于0的话，移除这个食物
            if(food.count === 0 ){
                state.foodArr.splice(state.foodArr.indexOf(food), 1)
            }
        }
    }
}
const actions={
      // 发送获取商品信息的请求
      async getGoods({commit}){
        const result=await reqGoods()
        if(result.code===0){
            const goods=result.data
            commit(RESEIVE_GOODS,{goods})
        }
    },
    async getRatings({commit}){
        const result=await reqRatings()
        if(result.code===0){
            const ratings=result.data
            commit(RESEIVE_RATINGS,{ratings})
        }
    },
    async getInfo({commit}){
        const result=await reqInfo()
        if(result.code===0){
            const info=result.data
            commit(RECEIVE_INFO,{info})
        }
    },
    foodCount({commit},{isAdd,food}){
        if(isAdd){
            // 增加
            commit(ADD_FOOD_COUNT,{food})
        }else{
            // 减少
            commit(REMOVE_FOOD_COUNT,{food})
        }
    }
    
}
const getters={
    // 总价格
    totalPrice(){
        return state.foodArr.reduce((pre, food) => pre + food.count*food.price, 0)
    },
    // 总数量
    totalCount(){
        return state.foodArr.reduce((pre, food) => pre + food.count, 0)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}