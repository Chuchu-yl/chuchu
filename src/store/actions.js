// 间接修改状态数据的方法
import {RECEIVE_ADDRESS,RECEIVE_CATEGORY,RECEIVE_SHOPS,RESET_USER} from './mutation-types'
import {reqSite,reqCategorys,reqShops,reqLogout} from '../api'
export default {
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
    // 发送异步请求修改状态
    async resetUser({commit}){
        const result = await reqLogout()
        if(result.code===0){
            commit(RESET_USER)
        }
    }
}