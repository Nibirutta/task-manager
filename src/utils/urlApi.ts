const baseURL = ''


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

const updateAccountRoute = {
    method: 'PATCH',
    route : '/account'
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



/* Task Routes */



const getTasksRoute = {
    method: 'GET',
    route : '/task'
}

const createTaskRoute = {
    method: 'POST',
    route : '/task'
}

const updateTaskRoute = {
    method: 'PATCH',
    route : '/task'
}

const deleteTaskRoute = {
    method: 'DELETE',
    route : '/task'
}

export {
    baseURL,
    registerRoute,
    loginRoute,
    refreshRoute,
    logoutRoute,
    updateAccountRoute,
    resetRequestRoute,
    resetPasswordRoute,
    deleteAccountRoute,
    getTasksRoute,
    createTaskRoute,
    updateTaskRoute,
    deleteTaskRoute,

}