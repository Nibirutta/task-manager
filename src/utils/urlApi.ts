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
    route : '/task'
}

const createTaskRoute = {
    method: 'POST',
    route : '/task'
}

const updateTaskRoute = {
    method: 'PUT',
    route : '/task/:'
}

const deleteTaskRoute = {
    method: 'DELETE',
    route : '/task/:'
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