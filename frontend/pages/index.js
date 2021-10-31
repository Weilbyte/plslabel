import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import router, { useRouter } from 'next/router'
import { ButtonPrimary, Text, StyledOcticon, Box} from '@primer/components'
import { TagIcon } from '@primer/octicons-react'

import { LINK_AUTH } from '../consts'
import { useUser } from '../components/UserProvider'


export default function Home() {
  const { currentUser } = useUser()

  useEffect(() => {
    if (currentUser && (currentUser.isAuth === true)) router.push('/dash')
  }, [currentUser])

  return (
    <div>
      <Box display="flex" verticalAlign='center' flexDirection='column' alignItems='center' paddingTop='100px'>
        <StyledOcticon icon={TagIcon} size={150} verticalAlign='center' />
        <Text as='h1' fontWeight='bold' paddingTop='25px'>plsLabel</Text>
        <Text as='h3' color='text.secondary'>Default labels for your personal GitHub repositories, and more</Text>

        <Box display="flex" paddingTop={45}>
          <a href={LINK_AUTH}>
            <ButtonPrimary variant='large'>Get Started</ButtonPrimary>
          </a>
        </Box>
      </Box>
    </div>
  )
}
