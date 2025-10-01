const baseURL = 'https://nibirutta-task-api.up.railway.app'

const registerRoute = {
    method: 'POST',
    route : '/user/register'
} 

const loginRoute = {
    method: 'POST',
    route : '/user/login'
}

const refreshRoute = {
    method: 'GET',
    route : '/user/refresh'
}

const logoutRoute = {
    method: 'GET',
    route : '/user/logout'
}
    
const resetRequestRoute = { 
    method: 'POST',
    route : '/user/reset/request'
}

const resetTokenRoute = {
    method: 'POST',
    route : '/user/reset/:'
}

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
    route : '/tasks/:'
}

const deleteTaskRoute = {
    method: 'DELETE',
    route : '/tasks/:'
}

export {
    baseURL,
    registerRoute,
    loginRoute,
    refreshRoute,
    logoutRoute,
    resetRequestRoute,
    resetTokenRoute,
    getTasksRoute,
    createTaskRoute,
    updateTaskRoute,
    deleteTaskRoute
}