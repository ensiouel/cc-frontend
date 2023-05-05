import {defineStore} from 'pinia'
import ShortenApi from "@/api/shorten.api";
import UserApi from "@/api/user.api";

export const useShortenStore = defineStore('shorten', {
    state: () => ({
        shortens: [],
        loading: false,
        userApi: new UserApi(),
        shortenApi: new ShortenApi()
    }),
    getters: {
        getShortenById(state) {
            return (id) => {
                return state.shortens.find(shorten => shorten.id === id)
            }
        },
        getShortens(state) {
            return state.shortens
        }
    },
    actions: {
        async deleteShorten(id) {
            try {
                await this.shortenApi.delete({key: id})

                this.shortens = this.shortens.filter(shorten => shorten.id !== id)
            } catch (error) {
                console.log(error)
            }
        },
        updateShorten(shorten) {
            const i = this.shortens.findIndex(el => el.id === shorten.id)
            if (i !== -1) {
                this.shortens[i] = shorten
            }
        },
        async fetchUserShortens({userId, tags = []}) {
            this.shortens = await this.userApi.shortens({userId: userId, tags})
        },
        addShorten(shorten) {
            this.shortens.push(shorten)
        }
    }
})
