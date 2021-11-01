import { parse } from 'cookie'
import aes from 'aes256'

import { COOKIE_NAME, HEADERS } from '../consts'
import { generateJWT } from '../util'

export default async function (request) {
    const cookies = parse(request.headers.get('Cookie') || '')

    if (cookies[COOKIE_NAME] != null) {
        let token = aes.decrypt(AES_KEY, cookies[COOKIE_NAME])

        let userReq = await fetch(`https://api.github.com/user`, {
            method: 'GET',
            headers: {
              accept: 'application/vnd.github.v3+json',
              'User-Agent': 'plsLabel',
              Authorization: `Bearer ${token}`,
            }
        })

        let userJSON = JSON.parse(await userReq.text())

        if (!userJSON.login) {
            return new Response(JSON.stringify({ error: { message: userJSON.message, external: true } }), { status: 401, headers: HEADERS })
        }

        let installationReq = await fetch(`https://api.github.com/users/${userJSON.login}/installation`, {
            method: 'GET',
            headers: {
              accept: 'application/vnd.github.v3+json',
              'User-Agent': 'plsLabel',
              Authorization: `Bearer ${await generateJWT()}`,
            }
        })

        let installationJSON = JSON.parse(await installationReq.text())

        return new Response(JSON.stringify({
            isAuth: true,
            id: userJSON.id,
            username: userJSON.login,
            avatar: userJSON.avatar_url,
            installed: installationJSON.id === undefined ? false : true,
            state: JSON.parse(await PREFS.get(userJSON.id))
        }), { status: 200, headers: HEADERS })
    } else {
        return new Response(JSON.stringify({ error: { message: `Missing '${COOKIE_NAME}' cookie.`}}), { status: 401, headers: HEADERS })
    }
}