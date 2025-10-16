import type { languageType, PreferencesTypes, themeType } from "./authServiceTypes"


type GetProfileResponseType = {
    name: string
    ownerId: string
    preferences: PreferencesTypes
}

type UpdateProfileNameRequestType = {
    name: string
}


type UpdateProfileNameResponseType = {
    message: string
}

type UpdateProfileLanguageRequestType = {
    language: languageType
}

type UpdateProfileLanguageResponseType = {
    message: string
}

type UpdateProfileThemeRequestType = {
    theme: themeType
}

type UpdateProfileThemeResponseType = {
    message: string
}

type UpdateProfileNotificationRequestType = {
    notificationType: string 
    activate: boolean
}

type UpdateProfileNotificationResponseType = {
    message: string
}

export type {
    GetProfileResponseType,
    UpdateProfileNameRequestType,
    UpdateProfileNameResponseType,
    UpdateProfileLanguageRequestType,
    UpdateProfileLanguageResponseType,
    UpdateProfileThemeRequestType,
    UpdateProfileThemeResponseType,
    UpdateProfileNotificationRequestType,
    UpdateProfileNotificationResponseType
}