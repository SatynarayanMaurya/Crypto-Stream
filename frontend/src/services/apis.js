const BASE_URL = import.meta.env.VITE_BACKEND_URL

export const authEndpoints ={
    SIGN_UP: BASE_URL + "/api/register",
    lOGIN: BASE_URL + "/api/login"
}

export const cryptoEndpoints ={
    GET_CRYPO_PRICES: BASE_URL + "/api/get-crypto-prices"
}

export const alertEndpoints ={
    CREATE_ALERT : BASE_URL +"/api/create-alert",
    GET_USER_ALERT : BASE_URL +"/api/get-user-alerts",
    UPDATE_ALERT_ACTIVE_STATE : BASE_URL +"/api/update-active-state",
    UPDATE_ALERT_TRIGGERED_STATE : BASE_URL +"/api/update-triggered-state",
}

export const sendEmailEndpoints = {
    SEND_EMAIL : BASE_URL + "/api/send-email"
}