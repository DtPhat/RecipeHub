import { createContext, useEffect, useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';

const AuthContext = createContext({});
const INITIAL_AUTH = JSON.parse(localStorage.getItem("auth"))

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(INITIAL_AUTH);
    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth))
    }, [auth]);
    console.log(auth);
    return (
        <GoogleOAuthProvider clientId="844497469072-8artnkmavrpdua89f6oqjsm1i1gpmp6n.apps.googleusercontent.com">
            <AuthContext.Provider value={{ auth, setAuth }}>
                {children}
            </AuthContext.Provider>
        </GoogleOAuthProvider>

    )
}

export default AuthContext;