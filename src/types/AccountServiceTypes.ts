type themeType = 'default' | 'neon-flow' | 'cloudy-focus' | 'after-hours' | 'forest-calm' | 'solar-bloom';

type languageType = 'pt-BR' | 'en-US';

type notificationType = {
	notificationType: 'email' | 'push' | 'none'
	isActivated: boolean
}


type PreferencesTypes = {
	theme: themeType
	language: languageType
	notification: notificationType
}

type ProfileTypes = {
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

	profile: ProfileTypes;
	accessToken: string;
}

type LoginRequestTypes = {
  username?: string
	email?: string
    password: string
}

type LoginResponseTypes =  {
	profile: ProfileTypes;
	accessToken: string;
}

type RefreshResponseTypes = {
	profile: ProfileTypes;
	accessToken: string;
}

type LogoutResponseTypes = {
	message: string
}

type UpdateAccountRequestTypes = {
	email?: string
	password?: string
	name?: string
	language?: languageType
	theme?: themeType
	notification?: notificationType
}

type UpdateAccountResponseTypes = {
	
	profile: ProfileTypes;
	accessToken: string;
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
	UpdateAccountRequestTypes,
	UpdateAccountResponseTypes,
	ResetRequestTypes,
	ResetResponseTypes,
	ResetPasswordRequestTypes,
	ResetPasswordResponseTypes,
	DeleteAccountResponseTypes,
	PreferencesTypes,
	ProfileTypes,
	themeType,
	languageType
}
