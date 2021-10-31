export default async function (payload) {
    if (payload.installation.account) { // New installation
        await PREFS.delete(payload.installation.account.id)
        return new Response('OK')
    }
}