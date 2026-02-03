'use client'
import {useContext, useState, createContext} from 'react';

const RoleContext = createContext()
export function RoleProvider({ children }) {

    const [role, setRole] = useState('consumer')

    return (
        <RoleContext.Provider value={{role, setRole}}>
            {children}
        </RoleContext.Provider>
    )
}

export const useRoleContext = () => useContext(RoleContext)