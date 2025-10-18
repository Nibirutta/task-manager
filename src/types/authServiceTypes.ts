type themeType = 'light' | 'dark' | 'lofi';

type languageType = 'pt-BR' | 'en-US';


type PreferencesTypes = {
	theme: themeType
	language: languageType
	notification: {
		email: boolean
	}
}

type UserInfoTypes = {
		name: string,
		preferences: PreferencesTypes,
		userCreatedAt: string,
		userUpdatedAt: string
	
}



type RegisterRequestTypes = {
	username: string
	email: string
	password: string
	name: string
}

type RegisterResponseTypes = {

	userInfo: UserInfoTypes;
}

type LoginRequestTypes = {
  username?: string
	email?: string
    password: string
}

type LoginResponseTypes =  {
	userInfo: UserInfoTypes
}

type RefreshResponseTypes = {
	userInfo: UserInfoTypes
}

type LogoutResponseTypes = {
	message: string
}

type CredentialRequestTypes = {
	email?: string
	password?: string
}

type CredentialResponseTypes = {
	userInfo: UserInfoTypes
}

type ResetRequestTypes = {
	email: string
}

type ResetResponseTypes = {
	succesful: boolean
}

type ResetPasswordRequestTypes = {
	password: string
}

type ResetPasswordResponseTypes = {
	message: string;
}

type DeleteAccountResponseTypes = {
	message: string;
}



export type {
	RegisterRequestTypes,
	RegisterResponseTypes,
	LoginRequestTypes,
	LoginResponseTypes,
	RefreshResponseTypes,
	LogoutResponseTypes,
	CredentialRequestTypes,
	CredentialResponseTypes,
	ResetRequestTypes,
	ResetResponseTypes,
	ResetPasswordRequestTypes,
	ResetPasswordResponseTypes,
	DeleteAccountResponseTypes,
	PreferencesTypes,
	UserInfoTypes,
	themeType,
	languageType
}
