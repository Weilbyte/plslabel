import { parse } from 'cookie'
import aes from 'aes256'

import { COOKIE_NAME, HEADERS } from '../consts'

export default async function (request) {
    console.log(request.method)
    const cookies = parse(request.headers.get('Cookie') || '')

    if (cookies[COOKIE_NAME] != null) {
        let token = aes.decrypt(AES_KEY, cookies[COOKIE_NAME])
        
        const userJSON = await (await fetch(`https://api.github.com/user`, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'User-Agent': 'plsLabel',
              Authorization: `token ${token}`,
            }
        })).json()

        if (!userJSON.login) {
            return new Response(JSON.stringify({ error: { message: userJSON.message, external: true } }), { status: 401, headers: HEADERS })
        }

        const automation = await request.json() || {}

        if (!Object.keys(automation).length) {
            return new Response(JSON.stringify({ error: { message: 'Missing body' } }), { status: 400, headers: HEADERS })
        }

        let copy = JSON.parse(await PREFS.get(userJSON.id))
        copy.automation = automation
        await PREFS.put(userJSON.id, JSON.stringify(copy))
        return new Response('OK', { status: 200, headers: HEADERS })   
    } else {
        return new Response(JSON.stringify({ error: { message: `Missing '${COOKIE_NAME}' cookie.`}}), { status: 401, headers: HEADERS })
    }
}