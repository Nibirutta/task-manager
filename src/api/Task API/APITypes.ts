
import * as AccountServiceTypes from '../../types/AccountServiceTypes'
import * as TaskServiceTypes from '../../types/taskServiceTypes'




type APIErrorType = {
    message: string
    error: string
    statusCode: number
}


export {
    AccountServiceTypes,
    TaskServiceTypes,
    type APIErrorType
}

