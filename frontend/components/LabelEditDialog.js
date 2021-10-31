import { Dialog, Box, Text, Button, ButtonDanger, Label, ButtonPrimary, TextInput, FormGroup, Flash, ButtonInvisible, Tooltip } from '@primer/components'
import { PencilIcon } from '@primer/octicons-react'
import { contrastColor } from 'contrast-color'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { ChromePicker } from 'react-color'

import { defaultDialogState } from './LabelSettings'

export default function LabelEditDialog(props) {
    const [pickerShown, setPickerShown] = useState(false)
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const [desc, setDesc] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        setPickerShown(false)
        setName(props.state.label.name || '')
        setColor(props.state.label.color || '#FFF')
        setDesc(props.state.label.desc || '')
        setError('')
    }, [props.state])

    function submit() {
        let _error = ''
        if (name.length === 0) _error = 'Name is too short'
        if (name.length > 50) _error = 'Name is too long (max 50 characters)'

        let _color = color.startsWith('#') ? color : `#${color}`
        if (!/^#([0-9A-F]{3}){1,2}$/i.test(_color)) _error = 'Color is not valid'

        if (desc.length > 100) _error = 'Description is too long (max 100 characters)'
        
        if (_error === '') {
            props.state.callback({
                index: props.state.label.index,
                name,
                color,
                desc
            })

            close()
        } else {
            setError(_error)
        }
    }

    function close() {
        props.setState({ ...defaultDialogState })
    }

    return (
        <Dialog
            isOpen={props.state.open}
            onDismiss={() => close()}
            aria-labelledby="label"
            wide={true}
        >
            <Dialog.Header id='label'>
                {props.state.text} {props.state.label.name ? `"${props.state.label.name}"` : ''}
            </Dialog.Header>
            <Box p={3}>
                <Flash variant='danger' style={{display: error != '' ? 'block' : 'none'}}>{error}</Flash>
                <Box display='flex' flexDirection='column'>
                    <Box display='flex'>
                        <Box display='flex' flexDirection='column'>
                            <FormGroup>
                                <FormGroup.Label htmlFor='name'>Name</FormGroup.Label>
                                <TextInput aria-label='Label name' name='name' id='name' placeholder='enhancement' value={name} onChange={(e) => setName(e.target.value)}/>
                                <FormGroup.Label style={{ marginTop: '10px'}}  htmlFor='color'>Color</FormGroup.Label>
                                <TextInput aria-label='Label color' name='color' id='color' placeholder='#FFFFF' value={color} onChange={(e) => setColor(e.target.value)}/>
                                <Button marginLeft='5px' aria-label='Toggle color picker' variant='small' onClick={() => setPickerShown(!pickerShown)}><PencilIcon/></Button>
                            </FormGroup>
                            {pickerShown ? <><ChromePicker color={color} onChange={(color) => setColor(color.hex)} disableAlpha={true}/><br/></> : null}
                        </Box>
                        <Box margin='auto'>
                            <Label
                                style={{ borderRadius: '3px', fontSize: '12px', backgroundColor: color && color.startsWith('#') ? color : `#${color}`, color: contrastColor({ bgColor: color}) }}
                                variant='large'
                                aria-label='Label preview'
                            >
                                {name.length ? name : 'enhancement'}
                            </Label>
                        </Box>
                    </Box>
                    <FormGroup.Label htmlFor='desc'>Description</FormGroup.Label>
                    <TextInput aria-label='Label description' name='description' id='desc' placeholder='Something isnt working' value={desc} onChange={(e) => setDesc(e.target.value)} />
                </Box>
                <Box display="flex" mt={3} justifyContent="flex-end">
                    <Button sx={{mr: 1}} onClick={() => close()}>Cancel</Button>
                    <ButtonPrimary onClick={() => submit()}>Save</ButtonPrimary>
                </Box>
            </Box>
      </Dialog>
    )
}