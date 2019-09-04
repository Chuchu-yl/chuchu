import {RESEIVE_GOODS,RESEIVE_RATINGS,RECEIVE_INFO} from '../mutation-types'
import {reqGoods,reqRatings,reqInfo} from '../../api'
const state={
    //商家相关
    goods:[],
    ratings:[],
    info:{}
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
            commit(RESEIVE_GOODS,{ratings})
        }
    },
    async getInfo({commit}){
        const result=await reqInfo()
        if(result.code===0){
            const info=result.data
            commit(RESEIVE_GOODS,{info})
        }
    }
}
const getters={}

export default {
    state,
    mutations,
    actions,
    getters
}