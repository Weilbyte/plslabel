import { Button, Box, Label, ButtonDanger, Text, ButtonInvisible, themeGet, ButtonPrimary } from '@primer/components'

import { contrastColor } from 'contrast-color'
import styled from 'styled-components'

const LabelTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`

const Row = styled.tr`
    & > td {
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: 15px;
    }

    border-bottom: 1px solid ${themeGet('colors.border.default')}
`

export default function LabelList(props) {
    const labels = props.labels.map((label, i) => {
        return (
            <Row key={i}>
                <td>
                    <Label
                        style={{ borderRadius: '3px'}}
                        variant='large'
                        bg={label.color}
                        color={contrastColor({ bgColor: label.color})}
                    >
                        {label.name}
                    </Label>
                </td>
                <td>{label.desc}</td>
                <td style={{float: 'right', paddingRight: '20px'}}>
                    <ButtonInvisible variant='small' style={{marginRight: '5px'}} onClick={() => props.editLabel(i)}>Edit</ButtonInvisible>
                    <ButtonInvisible variant='small' onClick={() => props.deleteLabel(i)}>Delete</ButtonInvisible>
                </td>
            </Row>
        )
    })

    return (
        <>
            <Box display='flex' flexDirection='column' borderWidth='1px' borderStyle='solid' borderColor='border.default' borderRadius='6px'>
                <Box bg='canvas.subtle' padding='16px' height='55px' borderRadius='6px 6px 0px 0px' marginBottom='10px'>
                    <Text fontWeight='bold'>{props.labels.length} labels</Text>
                    <ButtonPrimary style={{float: 'right'}} variant='small' onClick={() => props.newLabel()}>Add label</ButtonPrimary>
                </Box>
                <LabelTable>
                    <tbody>
                        {labels}
                    </tbody>
                </LabelTable>
            </Box>
        </>
        
    )
}