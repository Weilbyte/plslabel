import { Dropdown, FormGroup, Pagehead, Text, Heading, ButtonPrimary, ButtonDanger, TextInput } from '@primer/components'
import { useEffect, useState } from 'react'

export default function AutomationSettings(props) {
    const [automationEnabled, setAutomationEnabled] = useState(false)
    const [labelName, setLabelname] = useState('')
    
    useEffect(() => {
        setAutomationEnabled(props.user.state.automation.enabled)
        setLabelname(props.user.state.automation.default_label)
    }, [props.user])

    async function save() {
        const automation = {
            enabled: automationEnabled,
            default_label: labelName
        }

        const labelsRequest = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/api/automation`, { credentials: 'include', method: 'POST', body: JSON.stringify(automation) })
        if (labelsRequest.status === 200) {
            let copy = {...props.user}
            copy.state.automation = automation
            props.setUser(copy)
        } else {
            console.log('Error while attempting to save automation settings.\nResponse body: ', await labelsRequest.json())
            alert('Could not save settings, check console!')
        }
    }

    return (
        <>
            <FormGroup>
                <FormGroup.Label fontSize='24px' htmlFor='checkbox'>Automation</FormGroup.Label>
                <Text>When enabled, a label can be set as default</Text>
                <br/><br/>
                { automationEnabled ? <ButtonDanger id='checkbox' variant='small' onClick={() => setAutomationEnabled(!automationEnabled)}>Disable</ButtonDanger> : <ButtonPrimary id='checkbox' variant='small' onClick={() => setAutomationEnabled(!automationEnabled)}>Enable</ButtonPrimary>}
            </FormGroup>

            <FormGroup>
                <FormGroup.Label fontSize='24px' htmlFor='default'>Default label</FormGroup.Label>
                <Text>Any label with this name will become the default label applied to new issues</Text>
                <br/><br/>
                <TextInput aria-label='Default label' name='default' id='default' value={labelName} onChange={(e) => setLabelname(e.target.value)} />
            </FormGroup>
            <br/>
            <ButtonPrimary onClick={async () => save()}>Save</ButtonPrimary>
        </>
    )
}