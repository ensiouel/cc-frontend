import AuthApi from "@/api/auth.api";
import {domain} from "@/api/index";

export default class TagApi {
    async create({title}) {
        const {data} = await new AuthApi().client.post(domain + `/api/tags`, {
            title: title
        })

        return data.response
    }

    async delete({id}) {
        const {data} = await new AuthApi().client.delete(domain + `/api/tags/${id}`)

        return data.response
    }

    async update({id, title}) {
        const {data} = await new AuthApi().client.patch(domain + `/api/tags/${id}`, {
            title: title
        })

        return data.response
    }
}