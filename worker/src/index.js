addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

import { default as apiUser } from './api/user'
import { default as apiLabels } from './api/labels'
import { default as apiAutomation } from './api/automation'
import { default as apiFlowLogin } from './api/flow/login'
import { default as apiFlowComplete } from './api/flow/complete'
import { default as apiFlowLogout } from './api/flow/logout'

async function handleRequest(request) {
  let path = new URL(request.url).pathname
  path = path.replace('/worker', '')

  console.log(path)

  switch (path.split('?')[0]) { 
    case '/api/user': 
      return await apiUser(request)
    case '/api/labels':
      return await apiLabels(request)
    case '/api/automation':
      return await apiAutomation(request)
    case '/api/flow/login':
      return await apiFlowLogin(request)
    case '/api/flow/complete':
      return await apiFlowComplete(request)
    case '/api/flow/logout':
      return await apiFlowLogout(request)
    case '/event':
      try {
        const payload = await request.json()
        const handler = require(`./events/${payload.action}`).default
        return await handler(payload)
      } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
          return new Response('Event not recognized', { status: 404 })
        }
        console.log(e)
        return new Response('Internal Server Error', { status: 500 })
      }
    default:
      return new Response('', { status: 404 })
  }
}