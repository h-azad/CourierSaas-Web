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

// Cities API's 
export const CITIES_ADD = '/cities/cities/'
export const CITIES_EDIT = '/cities/cities/'
export const CITIES_LIST = '/cities/cities/'
export const CITIES_DELETE = '/cities/cities/'
export const CITIES_DETAILS = '/cities/cities/'

// Areas API's 
export const AREAS_ADD = '/cities/areas/'
export const AREAS_EDIT = '/cities/areas/'
export const AREAS_LIST = '/cities/areas/'
export const AREAS_DELETE = '/cities/areas/'
export const AREAS_DETAILS = '/cities/areas/'

// Service Type API's 
export const SERVICE_TYPE_ADD = '/service_type/service_type/'
export const SERVICE_TYPE_EDIT = '/service_type/service_type/'
export const SERVICE_TYPE_LIST = '/service_type/service_type/'
export const SERVICE_TYPE_DELETE = '/service_type/service_type/'
export const SERVICE_TYPE_DETAILS = '/service_type/service_type/'


// Shipment Type API's 
export const SHIPMENT_TYPE_ADD = '/shipment_type/shipment_type/'
export const SHIPMENT_TYPE_EDIT = '/shipment_type/shipment_type/'
export const SHIPMENT_TYPE_LIST = '/shipment_type/shipment_type/'
export const SHIPMENT_TYPE_DELETE = '/shipment_type/shipment_type/'
export const SHIPMENT_TYPE_DETAILS = '/shipment_type/shipment_type/'


// Product Type API's 

export const PRODUCT_TYPE_ADD = '/product_type/product_type/'
export const PRODUCT_TYPE_EDIT = '/product_type/product_type/'
export const PRODUCT_TYPE_LIST = '/product_type/product_type/'
export const PRODUCT_TYPE_DELETE = '/product_type/product_type/'
export const PRODUCT_TYPE_DETAILS = '/product_type/product_type/'


export const getApi = (api) => {
    return BASE_API + api
}