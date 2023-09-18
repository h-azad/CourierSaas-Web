import {apiBaseUrl} from '../configs/apiConfig'

export const BASE_API = apiBaseUrl


// Manage Merchant API's 
export const MARCHANT_ADD = '/manage-user/create-merchant'
export const MARCHANT_EDIT = '/manage-user/merchant/'
export const MARCHANT_LIST = '/manage-user/merchant'
export const MARCHANT_DELETE = '/manage-user/merchant/'
export const MARCHANT_DETAILS = '/manage-user/merchant/'
export const MARCHANT_UPDATE_STATUS = '/manage-user/merchant'
export const MARCHANT_CREATE_ORDER = '/marchant_app/create-percel/'
export const MARCHANT_ORDERS_INFO = '/marchant_app/orders/'
export const MARCHANT_ORDER_LIST = '/marchant_app/orders/'
export const MARCHANT_EDIT_ORDER = '/marchant_app/orders/'
export const MARCHANT_DELETE_ORDER = '/marchant_app/orders/'
export const MARCHANT_ORDER_STATUS_UPDATE = '/marchant_app/orders/'
export const MARCHANT_SEARCH_FILTER = '/marchant_app/search-filter/'
export const MARCHANT_STATISTICS = "/api/user/marchant-statistics/"


export const MARCHANT_SEARCH_CREATE_ORDER_FILTER = '/marchant_app/marchant-serach-order-filter/'
export const MARCHANT_PICKUP_ADDRESS = '/marchant_app/marchant-pickup-addreess/'

export const MARCHANT_GET_ORDER_REPORT = "/marchant_app/get-orders-report/"
export const MARCHANT_GET_ORDER_REPORT_PDF = "/marchant_app/get-orders-report-pdf/"
export const MARCHANT_GET_TRANSICTION_REPORT = "/marchant_app/marchant-transection/"
export const MARCHANT_GET_TRANSICTION_REPORT_PDF = "/marchant_app/marchant-transection-pdf/"
export const MARCHANT_GET_WITHDRAW_REQUEST_REPORT = "/marchant_app/get-marchant-withdraw-request/"
export const MARCHANT_GET_WITHDRAW_REQUEST_REPORT_PDF = "/marchant_app/get-marchant-withdraw-request-pdf/"

export const MARCHANT_ORDER_REPORT= "/marchant_app/default-marchant-order-report"
export const MARCHANT_ORDER_FILTER_BY_DATE_RANGE_REPORT = "/marchant_app/marchant-order-report/date-range/"
export const MARCHANT_ORDER_FILTER_PDF = "/marchant_app/marchant-order-report-pdf"





//Rider API's
export const RIDER_ADD = '/manage-user/create-rider'
export const RIDER_EDIT = '/manage-user/rider/'
export const RIDER_LIST = '/manage-user/rider'
export const RIDER_DELETE = '/manage-user/rider/'
export const RIDER_DETAILS = '/manage-user/rider/'
export const RIDER_UPDATE_STATUS = "/manage-user/rider"
export const RIDER_SEARCH = '/search-rider/'
export const RIDER_PICKUP = '/rider_app/pickup/'
export const RIDER_PICKUP_STATUS_UPDATE = '/rider_app/pickup/'
export const RIDER_DELIVARY = '/rider_app/delivary/'
export const RIDER_DELIVARY_STATUS_UPDATE = '/rider_app/delivary/'
export const RIDER_ORDER_STATUS = '/rider_app/status/'
export const RIDER_CURRENT_TASK_LIST = '/rider_app/current-task/'
export const RIDER_SEARCH_FILTER = '/rider_app/search-filter/'
export const RIDER_STATISTICS = "/api/user/rider-statistics/"

export const RIDER_SEARCH_CREATE_ORDER_FILTER = '/rider_app/rider-serach-order-filter/'
export const RIDER_PICKUP_CREATE_ORDER_FILTER = '/rider_app/rider-pickup-order-filter/'
export const RIDER_DELIVERY_CREATE_ORDER_FILTER = '/rider_app/rider-delivery-order-filter/'
export const RIDER_RETURN_CREATE_ORDER_FILTER = '/rider_app/rider-return-order-filter/'


export const RIDER_ASSIGNMENT = '/rider_app/rider-assignment'
export const UNPICKUP_ORDER_LIST = '/rider_app/unpickup-order-list'
export const PICKUP_RIDER_TASK= '/rider_app/pickup-rider-task'
export const PICKUP_RIDER_TASK_SEARCH_FILTER = '/rider_app/pickup-rider-task-search-filter/'


export const DELIVERY_ASSIGNMENT = '/rider_app/delivery-assignment'
export const UNDELIVERY_ORDER_LIST = '/rider_app/undelivery-order-list'
export const DELIVERY_RIDER_TASK = '/rider_app/delivery-rider-task'
export const DELIVERY_RIDER_TASK_SEARCH_FILTER = '/rider_app/delivery-rider-task-search-filter/'
export const RIDER_TASK_SEARCH_FILTER = '/rider_app/rider-task-serach-filter/'




export const RIDER_GET_PICKUP_REPORT = "/rider_app/get-pickup-report/"
export const RIDER_GET_PICKUP_REPORT_PDF = "/rider_app/get-pickup-report-pdf/"

export const RIDER_GET_DELIVERY_REPORT = "/rider_app/get-delivery-report/"
export const RIDER_GET_DELIVERY_REPORT_PDF = "/rider_app/get-delivery-report-pdf/"
export const RIDER_GET_DELIVERY_COLLECTION_REPORT = "/rider_app/get-delivery-collection-report/"
export const RIDER_GET_DELIVERY_COLLECTION_REPORT_PDF = "/rider_app/get-delivery-collection-report-pdf/"


//AGENT API's

export const AGENT_TYPE_ADD = '/api/user/agent-type/'
export const AGENT_TYPE_EDIT = '/api/user/agent-type/'
export const AGENT_TYPE_LIST = '/api/user/agent-type/'
export const AGENT_TYPE_DELETE = '/api/user/agent-type/'

export const AGENT_ADD = '/manage-user/create-agent'
export const AGENT_EDIT = '/manage-user/agent/'
export const AGENT_LIST = '/manage-user/agent '
export const AGENT_LIST_VIEW = '/api/agent_app/agent-list/'
export const UNDELIVERY_ORDER_BY_AGENT_LIST = '/api/agent_app/undelivery-order-list'
export const DELIVERY_TO_AGENT_TASK_LIST = '/api/agent_app/delivery-to-agent-task'
export const DELIVERY_ASSIGN_TO_AGENT = '/api/agent_app/delivery-assignment-to-agent'
export const CREATE_ORDER_BY_AGENT = '/api/agent_app/agent-orders/'
export const CREATE_ORDER_BY_AGENT_FILTER = '/api/agent_app/agent-order-filter'


export const AGENT_DELETE = '/manage-user/agent/'
export const AGENT_DETAILS = '/manage-user/agent/'
export const AGENT_UPDATE_STATUS = "/manage-user/agent"
export const AGENT_STATISTICS = "/api/user/agent-statistics/"
// export const AGENT_SEARCH = '/search-agent/'
export const AGENT_SEARCH = "/api/agent_app/search-filter/"




// Cities API's 
export const CITIES_ADD = '/city/'
export const CITIES_EDIT = '/city/'
export const CITIES_LIST = '/city/'
export const CITIES_DELETE = '/city/'
export const CITIES_DETAILS = '/city/'
export const CITY_UPDATE_STATUS = "/city/"
export const CITIES_SEARCH = '/search-city/'
export const CITY_STATISTICS = "/city/statistics/"
export const CITY_FORM_LIST = "/city/form-list/"

// Areas API's 
export const AREAS_ADD = '/area/'
export const AREAS_EDIT = '/area/'
export const AREAS_LIST = '/area/'
export const AREAS_DELETE = '/area/'
export const AREAS_DETAILS = '/area/'
export const AREAS_UPDATE_STATUS = "/area/"
export const AREAS_SEARCH = '/search-area/'
export const AREAS_BY_CITY = '/get-area/'
export const AREAS_STATISTICS = "/statistics/area/"
export const AREAS_FORM_LIST = "/area/form-list/"


export const ROUTE = "/api/route/"
export const ROUTE_SEARCH = '/search-route/'

// export const AREAS_FILTER_BY_CITY = '/filter-by-city/'

// Shipment Type API's 
export const SHIPMENT_TYPE_ADD = '/shipment_type/'
export const SHIPMENT_TYPE_EDIT = '/shipment_type/'
export const SHIPMENT_TYPE_LIST = '/shipment_type/'
export const SHIPMENT_TYPE_DELETE = '/shipment_type/'
export const SHIPMENT_TYPE_DETAILS = '/shipment_type/'
export const SHIPMENT_UPDATE_STATUS= '/shipment_type/'
export const SEARCH_SHIPMENT = '/search_shipment/'
export const SEARCH_SHIPMENT_TYPE = "/search-shipment-type/"
export const SHIPMENT_TYPE_STATISTICS = "/shipment-type/statistics/"
export const SHIPMENT_TYPE_FORM_LIST = "/shipment-type/form-view/"



// Product Type API's 

export const PRODUCT_TYPE_ADD = '/product_type/'
export const PRODUCT_TYPE_EDIT = '/product_type/'
export const PRODUCT_TYPE_LIST = '/product_type/'
export const PRODUCT_TYPE_DELETE = '/product_type/'
export const PRODUCT_TYPE_DETAILS = '/product_type/'
export const PRODUCT_UPDATE_STATUS = "/product_type/"
export const SEARCH_PRODUCT = '/search_product/'
export const PRODUCT_TYPE_USEING_FORM = "/product-type/form-view/"
export const SEARCH_PRODUCT_TYPE = "/search-product-type/"
export const PRODUCT_TYPE_STATISTICS = "/product-type/statistics/"


// Pricing Policy API's

export const PRICING_POLICY_ADD = '/pricing_policy/'
export const PRICING_POLICY_EDIT = '/pricing_policy/'
export const PRICING_POLICY_LIST = '/pricing_policy/'
export const PRICING_POLICY_DELETE = '/pricing_policy/'
export const PRICING_POLICY_DETAILS = '/pricing_policy/'
export const PRICING_POLICY_UPDATE_STATUS = "/pricing_policy/"
// export const SEARCH_PRICING_POLICY = '/search_pricing_policy/'
export const SEARCH_PRICING_POLICY = "/search-pricing-policy/"
export const PRICING_POLICY_STATISTICS = "/pricing-policy/statistics/"




//Create Order API's 

export const CREATE_ORDER_ADD = '/create_order/'
export const CREATE_ORDER_EDIT = '/create_order/'
export const CREATE_ORDER_LIST = '/create_order/'
export const CREATE_ORDER_DELETE = '/create_order/'
export const CREATE_ORDER_DETAILS = '/create_order/'
export const SEARCH_CREATE_ORDER = '/search_create_order/'
export const DIMENTION_BY_PRODUCT = '/create_order/get-dimention/'
export const PRICING_POLICY_BY_PRODUCT = '/get-price-policy/'
export const DELIVARY_CHARGE_BY_PERCEL_TYPE = '/get-delivary-charge/'
export const ORDER_STATUS_UPDATE = '/create-order/change-status/'
export const ORDER_STATISTICS = "/api/user/order-statistics/"

export const ORDER_RETURN = "/order-return/"



export const ADMIN_SEARCH_CREATE_ORDER_FILTER = '/admin-serach-order-filter/'


//Payment Method API's 

export const PAYMENT_METHOD_ADD = '/payment_method/'
export const PAYMENT_METHOD_EDIT = '/payment_method/'
export const PAYMENT_METHOD_LIST = '/payment_method/'
export const PAYMENT_METHOD_DELETE = '/payment_method/'
export const PAYMENT_METHOD_DETAILS = '/payment_method/'
export const PAYMENT_METHOD_UPDATE_STATUS = "/payment_method/"
export const SEARCH_PAYMENT_METHOD = '/search_payment_method/'
export const PAYMENT_METHOD_STATISTICS = "/payment-method/statistics/"
export const PAYMENT_METHOD_FORM_LIST = "/payment-method-form-list/statistics/"

//Account Wallet
export const ACCOUNT_WALLET_ADD = "/api/account-wallet/"
export const ACCOUNT_WALLET_LIST = "/api/account-wallet/"
export const ACCOUNT_WALLET_EDIT = "/api/account-wallet/"
export const ACCOUNT_WALLET_DELETE = "/api/account-wallet/"
export const ACCOUNT_WALLET_DETAILS = "/api/account-wallet/"
export const ACCOUNT_WALLET_UPDATE_STATUS = "/api/account-wallet/"
export const ACCOUNT_WALLET_SEARCH = "/api/account-wallet-search/"
export const ACCOUNT_WALLET_FORM_LIST = "/api/account-wallet/form-list/"



export const WITHDRAW_REQUEST_ADD = "/api/withdraw-reques/"
export const WITHDRAW_REQUEST_LIST = "/api/withdraw-reques/"
export const WITHDRAW_REQUEST_EDIT = "/api/withdraw-reques/"
export const WITHDRAW_REQUEST_DELETE = "/api/withdraw-reques/"
export const WITHDRAW_REQUEST_DETAILS = "/api/withdraw-reques/"
export const WITHDRAW_REQUEST_UPDATE_STATUS = "/api/withdraw-reques/"
export const WITHDRAW_REQUEST_SEARCH = "/api/withdraw-request-search/"


export const ADMIN_ADD = "/api/user/admin-viewset/"
export const ADMIN_LIST = "/api/user/admin-viewset/"
export const ADMIN_EDIT = "/api/user/admin-viewset/"
export const ADMIN_DELETE = "/api/user/admin-viewset/"
export const ADMIN_DETAILS = "/api/user/admin-viewset/"
export const PROFILE = "/api/user/user-profile/"
export const RIDER_PROFILE_UPDATE = "/api/user/rider-profile-update/"
export const MARCHANT_PROFILE_UPDATE = "/api/user/marchant-profile-update/"
// export const GET_USER = "/api/user/get-user/"
export const ADMIN_ROLE = "/api/user/admin-role-viewset/"
export const PERMISSION_LIST = "/api/user/get-permissions/"
export const ROLE_BASAED_PERMISSION = "/api/user/role-base/permission-viewset/"


export const CHANGE_PASSWORD = "/api/user/changepassword/"
export const FORGOT_PASSWORD = "/api/user/forgot-password/"
export const RESET_PASSWORD = "/api/user/reset-password/"

// export const ADMIN_ADD_SEARCH = "/api/withdraw-request-search/"

export const GET_USER = "/api/user/get-user/"
export const USER_LIST = "/api/user/user-viewset/"


export const ADJUSTMENT_LIST = '/api/wallet-adjust/'

export const TRANSECTIONS = "/api/transection/"




// Report URL
export const ADMIN_GET_ORDER_REPORT_APIVIEW = "/api/admin/order-report"
export const ADMIN_GET_ORDER_REPORT_GENERATE_PDF_APIVIEW = "/api/admin/order-report-generate-pdf"
export const ADMIN_GET_TRANSECTION_REPORT_APIVIEW = "/api/admin/transection-report"
export const ADMIN_GET_TRANSECTION_REPORT_GENERATE_PDF_APIVIEW = "/api/admin/transection-report-generate-pdf"
export const ADMIN_GET_WITHDRAW_REQUEST_REPORT_APIVIEW = "/api/admin/withdraw-request-report"
export const ADMIN_GET_WITHDRAW_REQUEST_REPORT_GENERATE_PDF_APIVIEW = "/api/admin/withdraw-request-report-generate-pdf"
export const ADMIN_GET_PICKUP_REPORT_APIVIEW = "/api/admin/pickup-report"
export const ADMIN_GET_PICKUP_REPORT_GENERATE_PDF_APIVIEW = "/api/admin/pickup-report-generate-pdf"
export const ADMIN_GET_DELIVERY_REPORT_APIVIEW = "/api/admin/delivery-report"
export const ADMIN_GET_DELIVERY_REPORT_GENERATE_PDF_APIVIEW = "/api/admin/delivery-report-generate-pdf"

export const ADMIN_GET_CANCEL_ISSUE_REPORT_APIVIEW = "/api/admin/order-cancel-issue/report"
export const ADMIN_GET_CANCEL_ISSUE_REPORT_GENERATE_PDF_APIVIEW = "/api/admin/order-cancel-issue/report-generate-pdf"

export const ADMIN_GET_DELIVERY_COLLECTION_REPORT_APIVIEW = "/api/admin/delivery-collection-report"
export const ADMIN_GET_ORDER_REVENUE_REPORT_APIVIEW = "/api/admin/order-revenue-report"
export const ADMIN_GET_ORDER_REVENUE_REPORT_GENERATE_PDF_APIVIEW = "/api/admin/order-revenue-report-generate-pdf"





export const TRANSECTIONS_FILTER = "/api/default-marchant-order-report"


export const ADMIN_DASHBOARD = "/api/user/admin-dashboard"


export const ADMIN_FILTER_ORDER_OVERVIEW = "/api/user/admin-filter--order-overview"

export const RIDER_DASHBOARD = "/rider_app/rider-dashboard"
export const FILTER_BY_YEAR_TRANSACTION_OVERVIEW = "/rider_app/rider-filter-transection-overview"
export const MARCHANT_DASHBOARD = '/marchant_app/marchant-dashboard'





//Create Organization
export const CREATE_ORGANIZATION = "/api/user/create-tanent"
export const COMPANY_SETTING = '/api/company-setting/'

export const getApi = (api) => {
    console.log(api)
    return BASE_API + api
}