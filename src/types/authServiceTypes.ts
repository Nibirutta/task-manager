type themeType = 'default' | 'neon-flow' | 'cloudy-focus' | 'after-hours' | 'forest-calm' | 'solar-bloom';

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
	accessToken: string;
}

type LoginRequestTypes = {
  username?: string
	email?: string
    password: string
}

type LoginResponseTypes =  {
	userInfo: UserInfoTypes;
	accessToken: string;
}

type RefreshResponseTypes = {
	userInfo: UserInfoTypes;
	accessToken: string;
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
