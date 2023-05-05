import AuthApi from "@/api/auth.api";
import {domain} from "@/api/index";

export default class UserApi {
    async shortens({userId, tags = []}) {
        const {data} = await new AuthApi().client.get(domain + `/api/users/${userId}/shortens?` + tags.map(tag => `tags=${tag}`).join(`&`))
        return data.response
    }

    async tags({userId}) {
        const {data} = await new AuthApi().client.get(domain + `/api/users/${userId}/tags`)

        return data.response
    }
}