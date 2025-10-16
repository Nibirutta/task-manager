const baseURL = 'https://nibirutta-task-api.up.railway.app'


/* Account Routes  */

const registerRoute = {
    method: 'POST',
    route : '/account/register'
} 

const loginRoute = {
    method: 'POST',
    route : '/account/login'
}

const refreshRoute = {
    method: 'GET',
    route : '/account/refresh'
}

const logoutRoute = {
    method: 'GET',
    route : '/account/logout'
}

const credentialRoute = {
    method: 'PATCH',
    route : '/account/credential'
}

const resetRequestRoute = { 
    method: 'POST',
    route : '/account/request-reset'
}

const resetPasswordRoute = {
    method: 'POST',
    route : '/account/reset-password'
}

const deleteAccountRoute = {
    method: 'DELETE',
    route : '/account'
}

/* Profile Routes */

const getProfileRoute = {
    method: 'GET',
    route : '/profile'
}

const updateProfileNameRoute = {
    method: 'POST',
    route : '/profile/name'
}

const updateProfileLanguageRoute = {
    method: 'POST',
    route : '/profile/language'
}

const updateProfileThemeRoute = {
    method: 'POST',
    route : '/profile/theme'
}

const updateProfileNotificationRoute = {
    method: 'POST',
    route : '/profile/notification'
}


/* Task Routes */



const getTasksRoute = {
    method: 'GET',
    route : '/tasks'
}

const createTaskRoute = {
    method: 'POST',
    route : '/tasks'
}

const updateTaskRoute = {
    method: 'PUT',
    route : '/tasks'
}

const deleteTaskRoute = {
    method: 'DELETE',
    route : '/tasks'
}

export {
    baseURL,
    registerRoute,
    loginRoute,
    refreshRoute,
    logoutRoute,
    resetRequestRoute,
    resetPasswordRoute,
    deleteAccountRoute,
    credentialRoute,
    getTasksRoute,
    createTaskRoute,
    updateTaskRoute,
    deleteTaskRoute,
    getProfileRoute,
    updateProfileNameRoute,
    updateProfileLanguageRoute,
    updateProfileThemeRoute,
    updateProfileNotificationRoute
}