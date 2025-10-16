
import * as AuthServiceTypes from '../../types/authServiceTypes'
import * as ProfileServiceTypes from '../../types/profileServiceTypes'
import * as TaskServiceTypes from '../../types/taskServiceTypes'




type APIErrorType = {
    message: string
    error: string
    statusCode: number
}


export {
    AuthServiceTypes,
    ProfileServiceTypes,
    TaskServiceTypes,
    type APIErrorType
}

