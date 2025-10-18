import type { languageType, PreferencesTypes, themeType, UserInfoTypes } from "./authServiceTypes"


type GetProfileResponseType = {
    name: string
    ownerId: string
    preferences: PreferencesTypes
}

type UpdateProfileNameRequestType = {
    name: string
}


type UpdateProfileNameResponseType = UserInfoTypes

type UpdateProfileLanguageRequestType = {
    language: languageType
}

type UpdateProfileLanguageResponseType = UserInfoTypes

type UpdateProfileThemeRequestType = {
    theme: themeType
}

type UpdateProfileThemeResponseType = UserInfoTypes

type UpdateProfileNotificationRequestType = {
    notificationType: string 
    activate: boolean
}

type UpdateProfileNotificationResponseType = UserInfoTypes

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