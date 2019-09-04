import {RECEIVE_ADDRESS,RECEIVE_CATEGORY,RECEIVE_SHOPS} from '../mutation-types'
import {reqSite,reqCategorys,reqShops} from '../../api/index'
const state={
 // 经纬度
    E:"116.36867",
    N:"40.10038",
    address:{},
    // 食品分类
    categorys:[],
    // 商铺
    shops:[],
}
const mutations={
    [RECEIVE_ADDRESS](state,address){
        state.address=address
    },
    [RECEIVE_CATEGORY](state,categorys){
        state.categorys=categorys
    },
    [RECEIVE_SHOPS](state,shops){
        state.shops=shops
    },
}
const actions={
    async getAddress({commit,state}){
        const {E,N} = state
        const result = await reqSite(E,N)
        if(result.code===0){
            const address=result.data
            // 成功了，就修改状态数据
            commit(RECEIVE_ADDRESS,address)
        }
        
    },
   async getCategorys({commit}){
        const result = await reqCategorys()
        if(result.code===0){
            const categorys=result.data
            commit(RECEIVE_CATEGORY,categorys)
        }
    },
    async getShops({commit,state}){
        const {E,N} = state
        const result=await reqShops({N,E})
        if(result.code===0){
            const shops=result.data
            commit(RECEIVE_SHOPS,shops)
        }
    },
}
const getters={}

export default {
    state,
    mutations,
    actions,
    getters
}