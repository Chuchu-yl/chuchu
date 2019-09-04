import {RECEIVE_USER,RESET_USER} from '../mutation-types'
import {reqLogout} from '../../api'
const state={
    user:{},
}
const mutations={
    [RECEIVE_USER](state,user){
        state.user=user
    },
    [RESET_USER](state){
        state.user={}
    },
}
const actions={
    // 发送异步请求修改状态
    async resetUser({commit}){
        const result = await reqLogout()
        if(result.code===0){
            commit(RESET_USER)
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