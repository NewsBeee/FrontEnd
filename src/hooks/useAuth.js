import { useState, useEffect } from 'react'


export function useAuth() {
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

}   