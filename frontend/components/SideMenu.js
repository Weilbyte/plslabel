import router, { useRouter } from 'next/router'
import { ButtonPrimary, Text, StyledOcticon, Box, SideNav} from '@primer/components'
import { TagIcon } from '@primer/octicons-react'
import { useEffect } from 'react'

export default function SideMenu(props) {
    return (
        <>
            <SideNav bordered maxWidth={360} aria-label="Side menu">
                <SideNav.Link href="#account" selected={props.hash === '#account'}>
                    <Text>Account</Text>
                </SideNav.Link>
                <SideNav.Link href="#labels" selected={props.hash === '#labels'}>
                    <Text>Labels</Text>
                </SideNav.Link>
                <SideNav.Link href="#automation" selected={props.hash === '#automation'}>
                    <Text>Automation</Text>
                </SideNav.Link>
            </SideNav>
        </>    
    )
}