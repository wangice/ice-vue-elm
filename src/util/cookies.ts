
import VueCookies from 'vue-cookies'

export const setCookies = (name: string, content: string) => {
    if (!name) return;
    if (typeof content != 'string') {
        content = JSON.stringify(content)
    }
    (VueCookies as any).set(name, content)
}

export const getCookies = (name: string) => {
    if (!name) return;
    return (VueCookies as any).get(name)
}

export const removeCookies = (name: string) => {
    if (!name) return;
    (VueCookies as any).remove(name)
}