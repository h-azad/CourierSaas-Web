import { ListGroup, ListGroupItem } from 'reactstrap'
import { Facebook, Instagram, Twitter } from 'react-feather'
import { useEffect, useState } from 'react'
import { formatDate } from '@utils'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, MARCHANT_ORDER_LIST } from "@src/constants/apiUrls"


const OrdersList = () => {
    const [activeOrder, setActiveOrder] = useState()

    const [orders, setOrders] = useState([])

    const fetchCreateOrderData = () => {
        return useJwt
            .axiosGet(getApi(MARCHANT_ORDER_LIST))
            .then((res) => {
                console.log("res", res.data)
                setOrders(res.data.data)
                return res.data
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchCreateOrderData()
    }, [])
    
    useEffect(() => {
        console.log(activeOrder)
        if (orders && !activeOrder){
            console.log(orders[0])
            orders[0] ? setActiveOrder(orders[0]?.id) : null
        }
    }, [orders])

    return (
        <div>
            <ListGroup>
                {orders &&
                    orders.map((info, idx) => (
                        <ListGroupItem active={activeOrder== info.id}>
                            <div className='d-flex justify-content-between w-100'>
                                <h5 className={`mb-1`}>#{info.parcel_id}</h5>
                                <small>Active</small>
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
