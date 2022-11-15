import React, { createContext, PropsWithChildren, useState } from "react";
import Profile from "../models/Profile";

type ProfileContextValue = {
    profile: Profile | null;
    setProfile: (_: Profile) => void;
}

export const ProfileContext = createContext<ProfileContextValue | null>(null);

interface IProps {

}

export default function ProfileContextProvider(props: PropsWithChildren<IProps>) {
    const [profile, setProfile] = useState<Profile | null>(null);

    return (
        <ProfileContext.Provider
            value={{
                profile,
                setProfile
            }}
        >
            {props.children}
        </ProfileContext.Provider>
    )
}