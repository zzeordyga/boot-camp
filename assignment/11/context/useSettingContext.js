"use client"
const { createContext, useState, useContext } = require("react");

const SettingContext = createContext();

export function UserSettingProvider({children}) {
    const [setting, setSetting] = useState({"theme" : "light", "language" : "en"});

    return (
        <SettingContext.Provider value={{setting, setSetting}}>
            {children}
        </SettingContext.Provider>
    )
}

export function useUserSetting() {
    return useContext(SettingContext)
}