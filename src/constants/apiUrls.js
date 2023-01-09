import {apiBaseUrl} from '../configs/apiConfig'

export const BASE_API = apiBaseUrl

// Merchant API's 
// export const MARCHANT_ADD = '/api/user/marchant/'
// export const MARCHANT_EDIT = '/api/user/marchant/'
// export const MARCHANT_LIST = '/api/user/marchant/'
// export const MARCHANT_DELETE = '/api/user/marchant/'
// export const MARCHANT_DETAILS = '/api/user/marchant/'
// export const MARCHANT_SEARCH = '/search-marchant/'
// export const MARCHANT_UPDATE_STATUS = '/api/user/marchant/'


// Manage Merchant API's 
export const MARCHANT_ADD = '/manage-user/create-merchant'
export const MARCHANT_EDIT = '/manage-user/merchant/'
export const MARCHANT_LIST = '/manage-user/merchant'
export const MARCHANT_DELETE = '/manage-user/merchant/'
export const MARCHANT_DETAILS = '/manage-user/merchant/'
export const MARCHANT_SEARCH = '/search-marchant/'
export const MARCHANT_UPDATE_STATUS = '/manage-user/merchant'



// Riders API's 
// export const RIDER_ADD = '/api/user/rider/'
// export const RIDER_EDIT = '/api/user/rider/'
// export const RIDER_LIST = '/api/user/rider/'
// export const RIDER_DELETE = '/api/user/rider/'
// export const RIDER_DETAILS = '/api/user/rider/'
// export const RIDER_SEARCH = '/search-rider/'


export const RIDER_ADD = '/manage-user/create-rider'
export const RIDER_EDIT = '/manage-user/rider/'
export const RIDER_LIST = '/manage-user/rider'
export const RIDER_DELETE = '/manage-user/rider/'
export const RIDER_DETAILS = '/manage-user/rider/'
export const RIDER_SEARCH = '/search-rider/'

// Agents API's 
// export const AGENT_ADD = '/api/user/agent/'
// export const AGENT_EDIT = '/api/user/agent/'
// export const AGENT_LIST = '/api/user/agent/'
// export const AGENT_DELETE = '/api/user/agent/'
// export const AGENT_DETAILS = '/api/user/agent/'
// export const AGENT_SEARCH = '/search-agent/'

export const AGENT_ADD = '/manage-user/create-agent'
export const AGENT_EDIT = '/manage-user/agent/'
export const AGENT_LIST = '/manage-user/agent '
export const AGENT_DELETE = '/manage-user/agent/'
export const AGENT_DETAILS = '/manage-user/agent/'
export const AGENT_SEARCH = '/search-agent/'


// Cities API's 
export const CITIES_ADD = '/city/'
export const CITIES_EDIT = '/city/'
export const CITIES_LIST = '/city/'
export const CITIES_DELETE = '/city/'
export const CITIES_DETAILS = '/city/'
export const CITIES_SEARCH = '/search-city/'


// Areas API's 
export const AREAS_ADD = '/area/'
export const AREAS_EDIT = '/area/'
export const AREAS_LIST = '/area/'
export const AREAS_DELETE = '/area/'
export const AREAS_DETAILS = '/area/'
export const AREAS_SEARCH = '/search-area/'
export const AREAS_BY_CITY = '/get-area/'

// Shipment Type API's 
export const SHIPMENT_TYPE_ADD = '/shipment_type/'
export const SHIPMENT_TYPE_EDIT = '/shipment_type/'
export const SHIPMENT_TYPE_LIST = '/shipment_type/'
export const SHIPMENT_TYPE_DELETE = '/shipment_type/'
export const SHIPMENT_TYPE_DETAILS = '/shipment_type/'
export const SHIPMENT_UPDATE_STATUS= '/shipment_type/'
export const SEARCH_SHIPMENT = '/search_shipment/'


// Product Type API's 

export const PRODUCT_TYPE_ADD = '/product_type/'
export const PRODUCT_TYPE_EDIT = '/product_type/'
export const PRODUCT_TYPE_LIST = '/product_type/'
export const PRODUCT_TYPE_DELETE = '/product_type/'
export const PRODUCT_TYPE_DETAILS = '/product_type/'
export const SEARCH_PRODUCT = '/search_product/'



//Pricing Policy API's 

// export const VOLUMETRIC_POLICY_ADD = '/pricing_policy/'
// export const VOLUMETRIC_POLICY_EDIT = '/pricing_policy/'
// export const VOLUMETRIC_POLICY_LIST = '/pricing_policy/'
// export const VOLUMETRIC_POLICY_DELETE = '/pricing_policy/'
// export const VOLUMETRIC_POLICY_DETAILS = '/pricing_policy/'
// export const SEARCH_VOLUMETRIC_POLICY = '/search_volumetric_policy/'

export const PRICING_POLICY_ADD = '/pricing_policy/'
export const PRICING_POLICY_EDIT = '/pricing_policy/'
export const PRICING_POLICY_LIST = '/pricing_policy/'
export const PRICING_POLICY_DELETE = '/pricing_policy/'
export const PRICING_POLICY_DETAILS = '/pricing_policy/'
export const SEARCH_PRICING_POLICY = '/search_pricing_policy/'


//Create Order API's 

export const CREATE_ORDER_ADD = '/create_order/'
export const CREATE_ORDER_EDIT = '/create_order/'
export const CREATE_ORDER_LIST = '/create_order/'
export const CREATE_ORDER_DELETE = '/create_order/'
export const CREATE_ORDER_DETAILS = '/create_order/'
export const SEARCH_CREATE_ORDER = '/search_create_order/'
export const DIMENTION_BY_PRODUCT = '/create_order/get-dimention/'
export const VOLUMETRIC_POLICY_BY_PRODUCT = '/create_order/get-price-policy/'



//Payment Method API's 

export const PAYMENT_METHOD_ADD = '/payment_method/'
export const PAYMENT_METHOD_EDIT = '/payment_method/'
export const PAYMENT_METHOD_LIST = '/payment_method/'
export const PAYMENT_METHOD_DELETE = '/payment_method/'
export const PAYMENT_METHOD_DETAILS = '/payment_method/'
export const SEARCH_PAYMENT_METHOD = '/search_payment_method/'

//Create Organization
export const CREATE_ORGANIZATION = "/api/user/create-tanent"



export const getApi = (api) => {
    return BASE_API + api
}