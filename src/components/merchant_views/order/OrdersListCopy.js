import { ListGroup, ListGroupItem } from 'reactstrap'
import { Facebook, Instagram, Twitter } from 'react-feather'
import { useEffect, useState } from 'react'
import { formatDate } from '@utils'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, MARCHANT_ORDER_LIST, SEARCH_MARCHANT_PARCEL,} from "@src/constants/apiUrls"
import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"

import {
    Table,
    Badge,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Button,
    CardText,
    Label,
    Input,
} from "reactstrap"


const OrdersList = ({ setActiveOrderData ,orders, setOrders, activeOrder, setActiveOrder }) => {

    const [searchOrders, setSearchOrders] = useState([])
    const [activeSearchItem, setActiveSearchItem] = useState(null)
    // console.log("searchOrders", searchOrders)

    const fetchSearchMerchantParcel = searchTerm => {
        return useJwt
            .axiosGet(getApi(SEARCH_MARCHANT_PARCEL) + '?search=' + searchTerm)
            .then((res) => {
                return res.data
            })
            .catch((err) => console.log(err))
    }

    const handleSearch = debounce(e => {
        // console.log(e.target.value)
        const searchTerm = e.target.value
        if (searchTerm.length > 5) {
            fetchSearchMerchantParcel(searchTerm)
                .then(data => {
                    if (data.length > 0) {
                        // console.log('ffdddydres', data)
                        setOrders(data)
                        setActiveOrder(data[0].id)
                        // setActiveOrderData(data)
                    } else {
                        console.log("No data")
                    }
                })
        }

    }, 300)

    function debounce(fn, time) {
        let timeoutId
        return wrapper
        function wrapper(...args) {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(() => {
                timeoutId = null
                fn(...args)
            }, time)
        }
    }


    return (

        <div>
            <div>
                <p >
                    <Link to={'/marchant-orders/create'}>
                        <Button.Ripple color="primary">Create Order</Button.Ripple>
                    </Link>
                    <div className="d-flex align-items-center mt-2">
                        
                        <input
                            placeholder="Search Parcel "
                            name="user_name"
                            type="text"
                            class="form-control "
                            onChange={handleSearch}
                        />
                        <Button.Ripple className="btn-icon ms-1" outline color="primary">
                            <Search size={16} />
                        </Button.Ripple>
                    </div>
                </p>
            </div>

            <ListGroup>
                {orders &&
                    orders.map((info, idx) => (
                        <ListGroupItem active={info.id == activeOrder}>
                            <div className='d-flex justify-content-between w-100' onClick={() =>
                                setActiveOrder(info.id)
                            }>
                                <h5 className={`mb-1`}
                                // >#{activeSearchItem ? activeSearchItem.parcel_id : info.parcel_id}</h5>
                                >#{info.parcel_id}</h5>
                                <small>{info.id == activeOrder ? 'Active' : ''}</small>
                            </div>
                            <p className='mb-1'>
                                <span>{formatDate(info.created_at)}</span>
                            </p>
                        </ListGroupItem>
                    ))
                }
            </ListGroup>
        </div>
    )
}

export default OrdersList
