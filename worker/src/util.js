const jwt = require('jsonwebtoken')

export async function generateJWT() {
    return await jwt.sign({
        iat: Math.trunc((new Date() / 1000) - 60),
        exp: Math.trunc((new Date() / 1000) + 60),
        iss: GITHUB_APP_ID
    }, GITHUB_APP_PEM, { algorithm: 'RS256' })
}

export async function generateIAT(installation_id, repository_id) {
    const req = await fetch(`https://api.github.com/app/installations/${installation_id}/access_tokens`, {
        method: 'POST',
        headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'plsLabel',
            Authorization: `Bearer ${await generateJWT()}`
        },
        body: JSON.stringify({
            repository_ids: [repository_id]
        })
    })

    return (await req.json()).token
}

export function validateLabels(labels) {
    let names = []
    let error = ''

    labels.forEach(label => {
        if (names.includes(label.name)) error = 'Duplicate labels'
        names.push(label.name)

        if (label.name.length === 0) error = 'Name is too short'
        if (label.name.length > 50) error = 'Name is too long'

        if (label.desc.length > 100) error = 'Description is too long'

        if (!/^#([0-9A-F]{3}){1,2}$/i.test(label.color)) error = 'Invalid color'
    })

    return [error === '' ? false : true, error]
}
