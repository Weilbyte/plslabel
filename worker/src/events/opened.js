import { generateIAT } from '../util'

export default async function (payload) {
    if (payload.repository.owner.id) {
        const automation = JSON.parse(await PREFS.get(payload.repository.owner.id)).automation

        if (automation.enabled) {     
            await fetch(`https://api.github.com/repos/${payload.repository.full_name}/issues/${payload.issue.number}/labels`, {
                    headers: {
                        'Authorization': `token ${await generateIAT(payload.installation.id, payload.repository.id)}`,
                        'User-Agent': 'plsLabel'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        labels: [automation.default_label]
                    }
                )
            })
        }
        
        return new Response('OK')
    }
}