import {apiBaseUrl} from '../configs/apiConfig'

export const BASE_API = apiBaseUrl

// Merchant API's 
export const MARCHANT_ADD = '/api/user/marchant/'
export const MARCHANT_EDIT = '/api/user/marchant/'
export const MARCHANT_LIST = '/api/user/marchant/'
export const MARCHANT_DELETE = '/api/user/marchant/'
export const MARCHANT_DETAILS = '/api/user/marchant/'

// Riders API's 
export const RIDER_ADD = '/api/user/rider/'
export const RIDER_EDIT = '/api/user/rider/'
export const RIDER_LIST = '/api/user/rider/'
export const RIDER_DELETE = '/api/user/rider/'
export const RIDER_DETAILS = '/api/user/rider/'

// Agents API's 
export const AGENT_ADD = '/api/user/agent/'
export const AGENT_EDIT = '/api/user/agent/'
export const AGENT_LIST = '/api/user/agent/'
export const AGENT_DELETE = '/api/user/agent/'
export const AGENT_DETAILS = '/api/user/agent/'

export const getApi = (api) => {
    return BASE_API + api
}