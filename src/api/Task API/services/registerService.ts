import type { IRegisterData, IRegisterResponse } from "../../../types/TaskApiTypes";
import { registerRoute } from "../../../utils/urlApi";
import { apiFetch } from "../client/apiClient";

const requestRegister = (data: IRegisterData ): Promise<IRegisterResponse> => {

    const response : Promise<IRegisterResponse> = apiFetch(registerRoute.route,{
        method: 'POST',
        body: JSON.stringify(data)
    })

    return response

} 

export default requestRegister;