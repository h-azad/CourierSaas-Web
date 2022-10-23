import {apiBaseUrl} from '../configs/apiConfig'

export const BASE_API = apiBaseUrl

// Merchant API's 
export const MARCHANT_ADD = '/api/user/marchant/'
export const MARCHANT_EDIT = '/api/user/marchant/'
export const MARCHANT_LIST = '/api/user/marchant/'
export const MARCHANT_DELETE = '/api/user/marchant/'
export const MARCHANT_DETAILS = '/api/user/marchant/'
export const MARCHANT_SEARCH = '/search-marchant/'
export const MARCHANT_UPDATE_STATUS = '/api/user/marchant/'



// Riders API's 
export const RIDER_ADD = '/api/user/rider/'
export const RIDER_EDIT = '/api/user/rider/'
export const RIDER_LIST = '/api/user/rider/'
export const RIDER_DELETE = '/api/user/rider/'
export const RIDER_DETAILS = '/api/user/rider/'
export const RIDER_SEARCH = '/search-rider/'


// Agents API's 
export const AGENT_ADD = '/api/user/agent/'
export const AGENT_EDIT = '/api/user/agent/'
export const AGENT_LIST = '/api/user/agent/'
export const AGENT_DELETE = '/api/user/agent/'
export const AGENT_DETAILS = '/api/user/agent/'
export const AGENT_SEARCH = '/search-agent/'


// Cities API's 
export const CITIES_ADD = '/cities/cities/'
export const CITIES_EDIT = '/cities/cities/'
export const CITIES_LIST = '/cities/cities/'
export const CITIES_DELETE = '/cities/cities/'
export const CITIES_DETAILS = '/cities/cities/'
export const CITIES_SEARCH = '/search-city/'


// Areas API's 
export const AREAS_ADD = '/cities/areas/'
export const AREAS_EDIT = '/cities/areas/'
export const AREAS_LIST = '/cities/areas/'
export const AREAS_DELETE = '/cities/areas/'
export const AREAS_DETAILS = '/cities/areas/'
export const AREAS_SEARCH = '/search-area/'
export const AREAS_BY_CITY = '/cities/get-area/'

// Shipment Type API's 
export const SHIPMENT_TYPE_ADD = '/shipment_type/shipment_type/'
export const SHIPMENT_TYPE_EDIT = '/shipment_type/shipment_type/'
export const SHIPMENT_TYPE_LIST = '/shipment_type/shipment_type/'
export const SHIPMENT_TYPE_DELETE = '/shipment_type/shipment_type/'
export const SHIPMENT_TYPE_DETAILS = '/shipment_type/shipment_type/'
export const SHIPMENT_UPDATE_STATUS= '/shipment_type/shipment_type/'
export const SEARCH_SHIPMENT = '/search_shipment/'


// Product Type API's 

export const PRODUCT_TYPE_ADD = '/product_type/product_type/'
export const PRODUCT_TYPE_EDIT = '/product_type/product_type/'
export const PRODUCT_TYPE_LIST = '/product_type/product_type/'
export const PRODUCT_TYPE_DELETE = '/product_type/product_type/'
export const PRODUCT_TYPE_DETAILS = '/product_type/product_type/'
export const SEARCH_PRODUCT = '/search_product/'



//Volumetric Policy API's 

export const VOLUMETRIC_POLICY_ADD = '/volumetric_policy/volumetric_policy/'
export const VOLUMETRIC_POLICY_EDIT = '/volumetric_policy/volumetric_policy/'
export const VOLUMETRIC_POLICY_LIST = '/volumetric_policy/volumetric_policy/'
export const VOLUMETRIC_POLICY_DELETE = '/volumetric_policy/volumetric_policy/'
export const VOLUMETRIC_POLICY_DETAILS = '/volumetric_policy/volumetric_policy/'
export const SEARCH_VOLUMETRIC_POLICY = '/search_volumetric_policy/'


//Create Order API's 

export const CREATE_ORDER_ADD = '/create_order/create_order/'
export const CREATE_ORDER_EDIT = '/create_order/create_order/'
export const CREATE_ORDER_LIST = '/create_order/create_order/'
export const CREATE_ORDER_DELETE = '/create_order/create_order/'
export const CREATE_ORDER_DETAILS = '/create_order/create_order/'
export const SEARCH_CREATE_ORDER = '/search_create_order/'
export const DIMENTION_BY_PRODUCT = '/create_order/get-dimention/'
export const VOLUMETRIC_POLICY_BY_PRODUCT = '/create_order/get-price-policy/'



//Payment Method API's 

export const PAYMENT_METHOD_ADD = '/payment_method/payment_method/'
export const PAYMENT_METHOD_EDIT = '/payment_method/payment_method/'
export const PAYMENT_METHOD_LIST = '/payment_method/payment_method/'
export const PAYMENT_METHOD_DELETE = '/payment_method/payment_method/'
export const PAYMENT_METHOD_DETAILS = '/payment_method/payment_method/'
export const SEARCH_PAYMENT_METHOD = '/search_payment_method/'

export const getApi = (api) => {
    return BASE_API + api
}