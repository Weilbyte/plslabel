import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import router from 'next/router'
import { ButtonPrimary, Text, StyledOcticon, Box, Spinner} from '@primer/components'

import { useUser } from '../components/UserProvider'
import SideMenu from '../components/SideMenu'
import AccountSettings from '../components/AccountSettings'
import LabelSettings from '../components/LabelSettings'
import AutomationSettings from '../components/AutomationSettings'
import NoInstallationWarning from '../components/NoInstallationWarning'
import TabMenu from '../components/TabMenu'

export default function Home() {
    const [hash, setHash] = useState('#account')
    const { currentUser, setCurrentUser } = useUser()

    function hashChange() {
        if (['#account', '#labels', '#automation'].includes(window.location.hash)) {
            setHash(window.location.hash)
        }
    }

    useEffect(() => {
        if (currentUser && (currentUser.isAuth === false)) router.push('/')

        hashChange()
    }, [currentUser])

    useEffect(() => {
        window.addEventListener('hashchange', hashChange);

        return () => {
            window.removeEventListener('hashchange', hashChange);
        };
    }, [])

    const settingsArea = () => {
        switch (hash) {
            default:
            case '#account':
                return <AccountSettings user={currentUser}/>
            case '#labels':
                return <LabelSettings user={currentUser} setUser={setCurrentUser}/>
            case '#automation':
                return <AutomationSettings user={currentUser} setUser={setCurrentUser}/>
        }
    }

    return Object.keys(currentUser).length ? (
        <>  
            <Box display="flex" paddingTop='100px' paddingLeft='16px' maxWidth='1012px' marginLeft='auto' marginRight='auto' height='600px' flexDirection='column'>
                <Box>
                    <TabMenu hash={hash} />
                </Box>
                <NoInstallationWarning show={!currentUser.installed}/>
                <Box  borderRadius='6px' padding='5px' marginTop='30px' width='100%' height='300px' color='fg.muted'>
                    {settingsArea()}
                </Box>
            </Box>
        </>
    ) : (
        <Box top='50%' left='50%' position='fixed'>
            <Spinner size='32px'/>
            <br/><br/>
            <Text fontWeight='bold'>Loading</Text>
        </Box>
    )
}
