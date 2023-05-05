import AuthApi from "@/api/auth.api";
import {domain} from "@/api/index";

export default class ShortenApi {
    async get({key}) {

    }

    async getStats({key, from, to, unit, units}) {
        const {data} = await new AuthApi().client.get(domain + `/api/shortens/${key}/stats`, {
            params: {
                from: from,
                to: to,
                unit: unit,
                units: units
            }
        })

        return data.response
    }

    async exportStats({key, from, to}) {
        const response = await new AuthApi().client.get(domain + `/api/shortens/${key}/stats/export`, {
            responseType: 'blob',
            params: {
                from: from,
                to: to
            }
        })

        const url = URL.createObjectURL(new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }))

        const link = document.createElement('a')
        link.href = url

        const contentDisposition = response.headers['content-disposition'];

        let fileName = 'unknown';
        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
            if (fileNameMatch.length === 2)
                fileName = fileNameMatch[1];
        }
        link.setAttribute('download', fileName);

        document.body.appendChild(link)
        link.click()

        return response.data.response
    }

    async create({key, url, title}) {
        const {data} = await new AuthApi().client.post(domain + `/api/shortens/`, {
            key: key,
            url: url,
            title: title
        })

        return data.response
    }

    async update({key, title, url, tags}) {
        const {data} = await new AuthApi().client.patch(domain + `/api/shortens/${key}`, {
            title: title,
            url: url,
            tags: tags
        })

        return data.response
    }

    async delete({key}) {
        const {data} = await new AuthApi().client.delete(domain + `/api/shortens/${key}`)

        return data.response
    }

    async getShortenStats({key, from, to, unit, units}) {
        const {data} = await new AuthApi().client.get(domain + `/api/shortens/${key}/stats`, {
            params: {
                from: from,
                to: to,
                unit: unit,
                units: units
            }
        })

        return data.response
    }
}