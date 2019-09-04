import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import mysite from './modules/mysite'
import shop from './modules/shop'
import user from './modules/user'

Vue.use(Vuex)
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        mysite,
        shop,
        user
    }
})