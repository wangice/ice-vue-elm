import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface ISelectCity {
    geohash: string
    address: any
}

@Module({ dynamic: true, store, name: 'app' })
class SelectCity extends VuexModule implements ISelectCity {
    geohash: string = ""
    address: any

    @Mutation
    private SET_GEOHASH(geohash: string) {
        this.geohash = geohash
    }

    @Action
    public setGeohash(geohash: string) {
        this.SET_GEOHASH(geohash)
    }

    @Mutation
    private SET_ADDRESS(address: any) {
        this.geohash = address
    }

    @Action
    public setAddress(address: any) {
        this.SET_ADDRESS(address)
    }
}

export const SelectCityModule = getModule(SelectCity)