import { ListGroup, ListGroupItem } from 'reactstrap'
import { Facebook, Instagram, Twitter } from 'react-feather'
import { useEffect, useState } from 'react'
import { formatDate } from '@utils'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, MARCHANT_ORDER_LIST } from "@src/constants/apiUrls"
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


const OrdersList = ({ orders, activeOrder ,setActiveOrder}) => {
   

    return (
        
        <div>
            <div>
                <p > 
                <Link to={'/marchant-orders/create'}>
                    <Button.Ripple color="primary">Create Order</Button.Ripple>
                </Link>
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
