import { Header, Button, StyledOcticon, Avatar, Link } from '@primer/components'
import { TagIcon } from '@primer/octicons-react'

import { useState, useEffect } from 'react'
import { useUser } from './UserProvider'

import { LINK_AUTH, LINK_DEAUTH } from '../consts'

export default function AppHeader() {
    const [isLoggedIn, setLoggedIn] = useState(false)
    const { currentUser } = useUser()

    useEffect(() => {
        if (currentUser && (currentUser.isAuth === true)) setLoggedIn(true)
    }, [currentUser])

    return (
    <>
        <Header>
            <Header.Item full>
                <Header.Link href="/" fontSize={2}>
                <StyledOcticon icon={TagIcon} size={32} mr={2} />
                <span>plsLabel</span>
                </Header.Link>
            </Header.Item>
                {isLoggedIn ? 
                <>
                    <Header.Item>
                        <Link href={LINK_DEAUTH}>Sign Out</Link>
                    </Header.Item>
                    <Header.Item mr={0}>
                        <Avatar
                            src={currentUser.avatar}
                            size={30}
                            square
                            alt={`@${currentUser.username}`}
                        />
                    </Header.Item>
                </> :
                    <Header.Item>
                        <Link href={LINK_AUTH}>Sign In</Link>
                    </Header.Item> 
                }
        </Header>
    </>
    )
}