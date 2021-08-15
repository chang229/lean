import { _post } from '@/utils/http'

interface login {
    phone:string;
    password:string;
}
export const login = (params:login) => _post('/front/user/login', params, {})