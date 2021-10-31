import { APP_PATH_ROOT, COOKIE_NAME } from '../../consts'

export default async function (request) {
    return new Response(null, {
        headers: {
            'Location': APP_PATH_ROOT,
            'Set-Cookie': `${COOKIE_NAME}=-1; Max-Age=-1; Path=/api; SameSite=None; Secure; HttpOnly;`
        },
        status: 302
    })
}