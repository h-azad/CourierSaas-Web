import React from 'react'
import { Card, CardBody, CardText, Row, Col, Table } from 'reactstrap'
import { Facebook, Instagram, Twitter } from 'react-feather'
import { useEffect, useState } from 'react'
import { formatDate } from '@utils'
import useJwt from '@src/auth/jwt/useJwt'
import { Link } from "react-router-dom"
import { getApi, MARCHANT_ORDER_LIST } from "@src/constants/apiUrls"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Select, Button, Space } from 'antd'
import {
    Badge,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,

    Label,
    Input,
} from "reactstrap"

const onMenuClick = (e) => {
    console.log('click', e)
}

const items = [
    
    {
        key: '1',
        label: '1st item',
    },
    {
        key: '2',
        label: '2nd item',
    },
    {
        key: '3',
        label: '3rd item',
    },
]

const handleStatus = (value) => {
    console.log(`selected ${value}`)
}

const OrderView = ({ activeOrderData }) => {
    console.log("activeOrderData", activeOrderData)

    return (

        
        <Card className='invoice-preview-card'>
            <div className='d-flex align-item-center justify-content-end'>
                <Link to={'/marchant-orders/create'}>
                    <Button type="primary" color="primary">Create Order</Button>
                </Link>
            </div>
            <CardBody className='invoice-padding pb-0'>

            </CardBody>
            <hr className='invoice-spacing' />
            <CardBody className='invoice-padding pt-0'>

                <Row className='invoice-spacing'>
                    <Col className='p-0' xl='6'>
                        {/* <h6 className='mb-2'>Invoice To:</h6> */}
                        <h6 className='mb-25'>Parcel Id : {activeOrderData?.parcel_id}</h6>
                        <h6 className='mb-25'>Recipient Name : {activeOrderData?.recipient_name}</h6>
                        <h6 className='mb-25'>Phone Number : {activeOrderData?.phone_number}</h6>
                        <h6 className='mb-25'>Delivary Address : {activeOrderData?.delivary_address}</h6>
                        <h6 className='mb-25'>Delivary Charge: {activeOrderData?.delivary_charge}</h6>
                        <h6 className='mb-25'>Total Amount : {activeOrderData?.amount_to_be_collected}</h6>
                        {/* <h6 className='mb-25'>Status : {activeOrderData.status}</h6> */}
                        {/* <CardText className='mb-25'>AAAA</CardText> */}
                    </Col>
                    <Col className='p-0' xl='3'>
                        <h6 className='mb-2'>
                            <Select
                                defaultValue="Pending"
                                style={{
                                    width: 120,
                                }}
                                onChange={handleStatus}
                                options={[
                                    {
                                        value: 'pending',
                                        label: 'pending',
                                    },
                                    {
                                        value: 'accepted',
                                        label: 'accepted',
                                    },
                                    {
                                        value: 'pickedup',
                                        label: 'pickedup',
                                    },
                                    {
                                        value: 'shipped',
                                        label: 'shipped',
                                    },
                                    {
                                        value: 'delivered',
                                        label: 'delivered',
                                    },
                                    {
                                        value: 'hold',
                                        label: 'hold',
                                    },
                                    {
                                        value: 'returned',
                                        label: 'returned',
                                    },
                                    {
                                        value: 'cancelled',
                                        label: 'cancelled',
                                    },
                                    {
                                        value: 'completed',
                                        label: 'completed',
                                    },

                                ]}
                            />
                        </h6>
                       
                    </Col>
                    <Col xl='3' className='d-flex align-item-center justify-content-end'>
                        
                        {/* <h6 className='mb-25'> 
                        <UncontrolledDropdown>
                            <DropdownToggle
                                className="icon-btn hide-arrow"
                                color="transparent"
                                size="sm"
                                caret
                            >
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href={"/marchant-orders/view/" + activeOrderData?.id} >
                                    <Eye className="me-50" size={15} />{" "}
                                    <span className="align-middle">View</span>
                                </DropdownItem>
                                <DropdownItem href={"/marchant_order/edit/" + activeOrderData?.id}>
                                    <Edit className="me-50" size={15} />{" "}
                                    <span className="align-middle">Edit</span>
                                </DropdownItem>
                                <DropdownItem href="/" onClick={e => deleteAction(e, activeOrderData?.id)}>
                                    <Trash className="me-50" size={15} />{" "}
                                    <span className="align-middle">Delete</span>
                                </DropdownItem>
                                <DropdownItem href="/" onClick={e => changeStatusAction(e, activeOrderData?.id)}>
                                    <Edit3 className="me-50" size={15} />{" "}
                                    <span className="align-middle">Change Status</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown></h6> */}
                        <Space direction="vertical">
                           
                            <Dropdown.Button
                                menu={{
                                    items,
                                    onClick: onMenuClick,
                                }}
                            >
                                Actions
                            </Dropdown.Button>
                        </Space>
                    </Col>                  
                </Row>
            </CardBody>       
        </Card >

    )

}


export default OrderView
