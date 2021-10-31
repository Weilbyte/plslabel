import router, { useRouter } from 'next/router'
import { ButtonPrimary, Text, StyledOcticon, Box, UnderlineNav} from '@primer/components'
import { TagIcon } from '@primer/octicons-react'
import { useEffect } from 'react'

export default function TabMenu(props) {
    return (
        <>
            <UnderlineNav bordered maxWidth={360} aria-label='Menu'>
                <UnderlineNav.Link href="#account" selected={props.hash === '#account'}>
                    <Text>Account</Text>
                </UnderlineNav.Link>
                <UnderlineNav.Link href="#labels" selected={props.hash === '#labels'}>
                    <Text>Labels</Text>
                </UnderlineNav.Link>
                <UnderlineNav.Link href="#automation" selected={props.hash === '#automation'}>
                    <Text>Automation</Text>
                </UnderlineNav.Link>
            </UnderlineNav>
        </>    
    )
}