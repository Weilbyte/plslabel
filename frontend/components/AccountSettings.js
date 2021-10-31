import { Avatar, Box, Text} from '@primer/components'

export default function AccountSettings(props) {
    return (
        <Box display='flex'>
            <Avatar src={props.user.avatar} square size='165' alt='Profile picture'/>
            
            <Box borderLeft='1px solid' borderLeftColor='fg.muted' paddingLeft='20px' height='165px' marginLeft='30px'>
                <Text color='fg.default' fontWeight='bold' fontSize='16px'>Account name</Text><br/>
                <a href={`https://github.com/${props.user.username}`} target='_blank'>{props.user.username}</a>

                <br/><br/>

                <Text color='fg.default' fontWeight='bold' fontSize='16px'>Account ID</Text><br/>
                {props.user.id}

                <br/><br/>

                <Text color='fg.default' fontWeight='bold' fontSize='16px'>GitHub App Installed?</Text><br/>
                {props.user.installed ? 'Yes' : 'No'}
            </Box>
        </Box>
    )
}