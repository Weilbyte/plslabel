import { ButtonPrimary, Dialog, Label } from '@primer/components'


import { contrastColor } from 'contrast-color'
import LabelList from './LabelList'
import LabelEditDialog from './LabelEditDialog'
import { useEffect, useState } from 'react'

export const defaultDialogState = {
    open: false,
    text: undefined,
    callback: undefined,
    label: {
        index: undefined,
        name: undefined,
        color: undefined,
        desc: undefined
    }
}

export default function LabelSettings(props) {
    const [labels, setLabels] = useState([])

    const [dialogState, setDialogState] = useState(defaultDialogState)

    useEffect(() => {
        if (props.user.state.labels) setLabels(props.user.state.labels)
    }, [props.user.state])

    function labelCallback(data) {
        let copy = [...labels]

        data.color = data.color.startsWith('#') ? data.color : `#${data.color}`
        if (data.index === undefined) {
            if (copy.some((label) => label.name === data.name)) {
                return
            }

            copy.push({
                name: data.name,
                color: data.color,
                desc: data.desc
            })
        } else {
            copy[data.index] = {
                name: data.name,
                color: data.color,
                desc: data.desc
            }
        }

        setLabels(copy)
    }

    function labelDelete(index) {
        let copy = [...labels]

        copy = copy.filter((_, i) => {
            return i !== index
        })

        setLabels(copy)
    }

    function openDialogEdit(index) {
        setDialogState({
            open: true,
            text: 'Edit label',
            callback: labelCallback,
            label: {
                index: index,
                name: labels[index].name,
                color: labels[index].color,
                desc: labels[index].desc
            }
        })
    }

    function openDialogNew() {
        setDialogState({
            ...defaultDialogState,
            open: true,
            text: 'New label',
            callback: labelCallback,
        })
    }

    async function save() {
        const labelsRequest = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/api/labels`, { credentials: 'include', method: 'POST', body: JSON.stringify(labels) })
        if (labelsRequest.status === 200) {
            let copy = {...props.user}
            copy.state.labels = labels
            props.setUser(copy)
        } else {
            console.log('Error while attempting to save labels.\nResponse body: ', await labelsRequest.json())
            alert('Could not save labels, check console!')
        }
    }

    return (
        <>
            <LabelEditDialog state={dialogState} setState={setDialogState} />
            <LabelList labels={labels} editLabel={openDialogEdit} newLabel={openDialogNew} deleteLabel={labelDelete} />
            <br/>
            <ButtonPrimary onClick={async () => await save()}>Save</ButtonPrimary>
        </>
        
    )
}