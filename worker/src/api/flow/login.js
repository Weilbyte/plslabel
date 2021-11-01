export default async function (request) {
    return Response.redirect(`https://github.com/login/oauth/authorize?scope=repo&client_id=${GITHUB_APP_CLIENT_ID}`)
}