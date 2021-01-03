import React from 'react'

const AuthContext = React.createContext()

export function AuthProdiver({ children }) {
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}
