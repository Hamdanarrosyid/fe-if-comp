import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/auth/authContext"

// eslint-disable-next-line react/prop-types
export const Protected = ({ children }) => {
    const { email } = useContext(AuthContext)
    if (!email) {
        return <Navigate to={'/checkin'} replace />
    }
    return children
}

// eslint-disable-next-line react/prop-types
export const UnProtected = ({children}) => {
    const {email} = useContext(AuthContext)
    if (email) {
        return <Navigate to={'/'} replace />
    }
    return children
}