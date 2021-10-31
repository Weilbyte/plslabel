export default async function (payload) {
    if (payload.installation) { // New installation
        await PREFS.delete(payload.installation.account.id)
        return new Response('OK')
    } else {
        
    }
    
}