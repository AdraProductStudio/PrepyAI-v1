import { getUserAPIToken } from "./Storage";

export const isAuthenticated = () => {
    return getUserAPIToken() !== null ? true : false
}