import React, { useState, useEffect } from 'react'

const UserContext = React.createContext(null)

export default function UserProvider({user, children}) {
  const [currentUser, setCurrentUser] = useState(user)

  useEffect(async () => {
    if (Object.keys(user).length === 0) {
      const userRequest = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/api/user`, { credentials: 'include'})
      if (userRequest.status === 200) {
        setCurrentUser(await userRequest.json())
      } else {
        setCurrentUser({isAuth: false})
      }
    }
  }, [])

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => React.useContext(UserContext)