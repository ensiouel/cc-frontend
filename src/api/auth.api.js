import axios from "axios";
import {domain} from "@/api/index";

export default class AuthApi {
    static session = JSON.parse(localStorage.getItem('session'))

    constructor() {
        this.client = axios.create()
        this.unauthorizedClinet = axios.create()

        this.client.interceptors.request.use(
            request => {
                if (!AuthApi.session.access_token) {
                    return request
                }

                const newRequest = {
                    headers: {},
                    ...request
                }

                newRequest.headers.Authorization = `Bearer ${AuthApi.session.access_token}`

                return newRequest
            },
            error => {
                return Promise.reject(error)
            }
        )

        this.client.interceptors.response.use(response => response, async error => {
                if (!AuthApi.session.refresh_token || error.response?.status !== 401 || error.config.retry) {
                    return Promise.reject(error)
                }

                try {
                    AuthApi.session = await this.refresh({refresh_token: AuthApi.session.refresh_token})
                    localStorage.setItem('session', JSON.stringify(AuthApi.session))
                } catch (error) {
                    localStorage.removeItem('session')
                }

                const newRequest = {
                    ...error.config,
                    retry: true
                }

                return this.client(newRequest)
            }
        )
    }

    async signin({name, password}) {
        const {data} = await this.unauthorizedClinet.post(domain + '/api/auth/signin', {name, password})

        AuthApi.session = data.response
        localStorage.setItem('session', JSON.stringify(AuthApi.session))

        return data.response
    }

    async signup({name, password}) {
        const {data} = await this.unauthorizedClinet.post(domain + '/api/auth/signup', {name, password})

        AuthApi.session = data.response
        localStorage.setItem('session', JSON.stringify(AuthApi.session))

        return data.response
    }

    async refresh({refresh_token}) {
        const {data} = await this.client.post(domain + '/api/auth/refresh', {refresh_token: refresh_token})
        return data.response
    }

    signout() {
    }
}