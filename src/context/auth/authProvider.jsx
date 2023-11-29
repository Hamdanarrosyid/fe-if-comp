import { useEffect, useMemo, useState } from "react"
import { AuthContext } from "./authContext"
import Cookies from "universal-cookie"
import { schedule } from "../../api"

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const cookies = useMemo(() => new Cookies(null, { path: '/' }), [])
    const [email, setEmail] = useState(null)

    const handleCheckin = async (inputEmail) => {
        try {
            const checkin = await schedule.post('/checkin', {
                email: inputEmail
            })
            cookies.set('email', checkin.data.data.email)
            setEmail(checkin.data.data.email)
            return 1
        } catch (error) {
            console.log(error)
            return 0
        }
    }

    const handleLogout = () => {
        cookies.remove('email')
        setEmail(null)
        return 1
    }

    const value = {
        email,
        onCheckin: handleCheckin,
        onLogout: handleLogout
    }

    useEffect(() => {
        setEmail(cookies.get('email'))
    }, [])
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider