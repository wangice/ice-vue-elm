import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './modules/app'
import { ISelectCity } from './modules/city'
Vue.use(Vuex)

export interface IRootState {
    app: IAppState
    selectCity: ISelectCity
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
