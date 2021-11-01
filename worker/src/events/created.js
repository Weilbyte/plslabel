import { DEFAULT_LABELS } from "../consts"
import { generateIAT } from "../util"

export default async function (payload) {
    if (payload.installation.account) { // Remove installation
        let defaultState = {
            labels: DEFAULT_LABELS,
            automation: {
                enabled: false,
                default_label: undefined
            }
        }
    
        await PREFS.put(payload.installation.account.id, JSON.stringify(defaultState))
        return new Response('OK')
    } else {
        const token = await generateIAT(payload.installation.id, payload.repository.id)
        const req = await fetch(`https://api.github.com/repos/${payload.repository.full_name}/labels`, { headers: {
            'User-Agent': 'plsLabel',
            'Authorization': `token ${token}`
        }})

        let repo_labels = await req.json()
        let user_labels = JSON.parse(await PREFS.get(payload.repository.owner.id)).labels

        let done = -1

        for (let i = 0; i < repo_labels.length; i++) {
            if (user_labels[i]) {
                await fetch(`https://api.github.com/repos/${payload.repository.full_name}/labels/${repo_labels[i].name}`, {
                    headers: {
                        'Authorization': `token ${token}`,
                        'User-Agent': 'plsLabel'
                    },
                    method: 'PATCH',
                    body: JSON.stringify({
                        new_name: user_labels[i].name,
                        color: user_labels[i].color.replace('#', ''),
                        description: user_labels[i].desc
                    })
                })
                done = i + 1
            } else {
                await fetch(`https://api.github.com/repos/${payload.repository.full_name}/labels/${repo_labels[i].name}`, {
                    headers: {
                        'Authorization': `token ${token}`,
                        'User-Agent': 'plsLabel'
                    },
                    method: 'DELETE'
                }) 
            }
        }

        if (done < user_labels.length) {
            for (let i = done; i < user_labels.length; i++) {
                await fetch(`https://api.github.com/repos/${payload.repository.full_name}/labels`, {
                    headers: {
                        'Authorization': `token ${token}`,
                        'User-Agent': 'plsLabel'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        name: user_labels[i].name,
                        color: user_labels[i].color.replace('#', ''),
                        description: user_labels[i].desc
                    })
                })
            }
        }

        return new Response('OK')
    }
}