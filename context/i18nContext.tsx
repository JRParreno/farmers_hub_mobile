import React, { createContext, PropsWithChildren, useState } from "react";

enum i18nEnum {
    English,
    Tagalog
}

type i18nContextValue = {
    language: i18nEnum;
    setLanguage: (_: i18nEnum) => void;
}

export const i18nContext = createContext<i18nContextValue>({
    language: i18nEnum.Tagalog,
    setLanguage: (_: i18nEnum) => i18nEnum.Tagalog
});

interface IProps {

}

export default function I18nContextProvider(props: PropsWithChildren<IProps>) {
    const [language, setLanguage] = useState<i18nEnum>(i18nEnum.Tagalog);

    return (
        <i18nContext.Provider
            value={{
                language,
                setLanguage
            }}
        >
            {props.children}
        </i18nContext.Provider>
    )
}