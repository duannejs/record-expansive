import { Token } from "@mui/icons-material";
import token from "../../redux/ducks/auth/token";

const TOKEN = 'auth-token';
export const ROUTES = {
    AUTH_TOKEN: '/session',
    AUTH_PERMISSION: '/permission',
    CATEGORYS: '/unidade',
    DOCUMENTS: '/documentos',
    DOCUMENTSID: '/documentosID',
    CABECALHO: '/cabecalho',
    CABECALHOS: '/cabecalhoup',
    VEHICLES: '/Km',
    
}

export const stateStorage = {
    setToken: (token: string) => sessionStorage.setItem(TOKEN, token),
    getToken: () => sessionStorage.getItem(TOKEN),
    logout: () => sessionStorage.removeItem(TOKEN)
}