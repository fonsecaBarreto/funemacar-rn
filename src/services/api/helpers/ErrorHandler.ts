
const UNKNOWN_ERROR = "Erro inesperado."

function ResultError(message : string, error?: any){
    var params = null
    var name = null
    if(error){
        if(typeof error == "string"){
            message = error
            name = error
        }else if(typeof error == "object"){
            const { message: erM, params: erP = {}, name: eNa } = error
            message = erM
            params = erP
            name = eNa
        }
    }
    return { message, params, name }
}

export function errorHandler(err: any) {
    if(!err.response) return ResultError(UNKNOWN_ERROR)
    var { error } = err.response.data
    return ResultError(UNKNOWN_ERROR, error)
}

