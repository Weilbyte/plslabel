export const DEFAULT_LABELS = [
    { name: 'bug', color: '#d73a4a', desc: 'Something isn\'t working' },
    { name: 'documentation', color: '#0075ca', desc: 'Improvements or additions to documentation' },
    { name: 'duplicate', color: '#cfd3d7', desc: 'This issue or pull request already exists' },
    { name: 'enhancement', color: '#a2eeef', desc: 'New feature or request' },
    { name: 'good first issue', color: '#7057ff', desc: 'Good for newcomers' },
    { name: 'help wanted', color: '#008672', desc: 'Extra attention is needed' },
    { name: 'invalid', color: '#e4e669', desc: 'This doesn\'t seem right' },
    { name: 'question', color: '#d876e3', desc: 'Further information is requested' },
    { name: 'wontfix', color: '#ffffff', desc: 'This will not be worked on' }
]

export const HEADERS = {
    'Access-Control-Allow-Origin': APP_URL,
    'Access-Control-Allow-Credentials': true
}

export const COOKIE_NAME = 'pLT'

export const APP_PATH_ROOT = `${APP_URL}/`