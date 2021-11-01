import aes from "aes256"
import { APP_PATH_ROOT, COOKIE_NAME } from "../../consts"

export default async function (request) {
    const code = new URL(request.url).searchParams.get('code')

    if (!code) {
        return new Response(JSON.stringify({error: { message: "Missing 'code' parameter"}}), { status: 400 })
    }

    const tokenJSON = await (await fetch(`https://github.com/login/oauth/access_token?client_id=${GITHUB_APP_CLIENT_ID}&client_secret=${GITHUB_APP_CLIENT_SECRET}&code=${code}`, {
        method: 'POST',
        headers: {
          accept: 'application/json'
        }
    })).json()

    if (tokenJSON.error) {
        return new Response(JSON.stringify({ error: { message: tokenJSON.error_description, external: true } }), { status: 400 })
    }

    const encrypted = aes.encrypt(AES_KEY, tokenJSON.access_token)

    return new Response(null, {
        headers: {
            'Location': APP_PATH_ROOT,
            'Set-Cookie': `${COOKIE_NAME}=${encrypted}; Max-Age=28800; Path=/worker; SameSite=None; Secure; HttpOnly;`
        },
        status: 302
    })

}