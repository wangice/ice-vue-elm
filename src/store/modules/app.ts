import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IAppState {
    sheetShow: boolean
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
    public sheetShow = false


    @Mutation
    private SET_SHEET_SHOW(show: boolean) {
        this.sheetShow = show
        console.log(this.sheetShow)
    }

    @Action
    public setSheetShow(show: boolean) {
        this.SET_SHEET_SHOW(show)
    }
}

export const AppModule = getModule(App)