import router, { useRouter } from 'next/router'
import { ButtonPrimary, Text, StyledOcticon, Box, SideNav, Button, ButtonGroup} from '@primer/components'
import { SyncIcon } from '@primer/octicons-react'
import { TagIcon } from '@primer/octicons-react'
import { useEffect } from 'react'
import Link from 'next/link'

import { GITHUB_APP_INSTALL_PAGE } from '../consts'

export default function NoInstallationWarning(props) {
    const router = useRouter()

    if (!props.show) {
        return null
    }
    
    return (
        <>
            <Box display='flex' padding='20px' borderWidth='1px' borderColor='severe.emphasis' borderStyle='solid' width='60%' borderRadius='6px' bg='severe.subtle' marginBottom='20px' marginTop='20px' color='fg.default' alignItems='center'>
                GitHub App Installation not detected
                <ButtonGroup marginLeft='auto'>
                    <Link href={GITHUB_APP_INSTALL_PAGE} passHref>
                        <ButtonPrimary>Install</ButtonPrimary>
                    </Link>
                    <Button onClick={() => {
                        router.reload(window.location.pathname)
                    }}>
                        <SyncIcon size={16} />
                    </Button>
                </ButtonGroup> 
                
            </Box>
        </>    
    )
}