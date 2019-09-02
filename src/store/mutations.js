// 直接修改状态数据的方法的对象
import {RECEIVE_ADDRESS,RECEIVE_CATEGORY,RECEIVE_SHOPS} from './mutation-types'

export default {
    [RECEIVE_ADDRESS](state,address){
        state.address=address
    },
    [RECEIVE_CATEGORY](state,categorys){
        state.categorys=categorys
    },
    [RECEIVE_SHOPS](state,shops){
        state.shops=shops
    }
}