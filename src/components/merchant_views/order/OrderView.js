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
import { Dropdown, Select, Space, Typography } from 'antd'
import {
    Badge,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Button,
    Label,
    Input,
} from "reactstrap"

const handleStatus = (value) => {
    console.log(`selected ${value}`)
}

const OrderView = ({ activeOrderData }) => {
    console.log("activeOrderData", activeOrderData)
    return (

        
        <Card className='invoice-preview-card'>
            <div className='d-flex align-item-center justify-content-end'>
                <Link to={'/marchant-orders/create'}>
                    <Button.Ripple color="primary">Create Order</Button.Ripple>
                </Link>
            </div>
            <CardBody className='invoice-padding pb-0'>


                <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
                    {/* <div>
                        <div className='logo-wrapper'>
                            <svg viewBox='0 0 139 95' version='1.1' height='24'>
                                <defs>
                                    <linearGradient id='invoice-linearGradient-1' x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%'>
                                        <stop stopColor='#000000' offset='0%'></stop>
                                        <stop stopColor='#FFFFFF' offset='100%'></stop>
                                    </linearGradient>
                                    <linearGradient
                                        id='invoice-linearGradient-2'
                                        x1='64.0437835%'
                                        y1='46.3276743%'
                                        x2='37.373316%'
                                        y2='100%'
                                    >
                                        <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                                        <stop stopColor='#FFFFFF' offset='100%'></stop>
                                    </linearGradient>
                                </defs>
                                <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                                    <g transform='translate(-400.000000, -178.000000)'>
                                        <g transform='translate(400.000000, 178.000000)'>
                                            <path
                                                className='text-primary'
                                                d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                                                style={{ fill: 'currentColor' }}
                                            ></path>
                                            <path
                                                d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                                                fill='url(#invoice-linearGradient-1)'
                                                opacity='0.2'
                                            ></path>
                                            <polygon
                                                fill='#000000'
                                                opacity='0.049999997'
                                                points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                                            ></polygon>
                                            <polygon
                                                fill='#000000'
                                                opacity='0.099999994'
                                                points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                                            ></polygon>
                                            <polygon
                                                fill='url(#invoice-linearGradient-2)'
                                                opacity='0.099999994'
                                                points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                                            ></polygon>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <h3 className='text-primary invoice-logo'>Update Tech Ltd.</h3>
                        </div>
                        <CardText className='mb-25'>House: 1240, Road: 9, Avenue: 2, Floor: 3rd </CardText>
                        <CardText className='mb-25'> Mirpur DOHS, Dhaka-1216, Bangladesh</CardText>
                        <CardText className='mb-25'>contact@updatetechltd.com</CardText>
                        <CardText className='mb-0'>+8809678800583</CardText>
                    </div> */}
                    {/* <div className='mt-md-0 mt-2'>
                        <h4 className='invoice-title'>
                            Invoice <span className='invoice-number'> #{activeOrderData?.parcel_id}</span>
                        </h4>
                        <div className='invoice-date-wrapper'>
                            <p className='invoice-date-title'>Date Issued:</p>
                            <p className='invoice-date'> {formatDate(activeOrderData?.created_at)}</p>
                        </div>
                        <div className='invoice-date-wrapper'>
                            <p className='invoice-date-title'>Updated Date:</p>
                            <p className='invoice-date'>{formatDate(activeOrderData?.updated_at)}</p>
                        </div>
                    </div> */}
                </div>

            </CardBody>
            <hr className='invoice-spacing' />
            <CardBody className='invoice-padding pt-0'>

                <Row className='invoice-spacing'>
                    <Col className='p-0' xl='8'>
                        {/* <h6 className='mb-2'>Invoice To:</h6> */}
                        <h6 className='mb-25'>Recipient Name : {activeOrderData?.recipient_name}</h6>
                        <h6 className='mb-25'>Phone Number : {activeOrderData?.phone_number}</h6>
                        <h6 className='mb-25'>Delivary Address : {activeOrderData?.delivary_address}</h6>
                        <h6 className='mb-25'>Delivary Charge: {activeOrderData?.delivary_charge}</h6>
                        <h6 className='mb-25'>Total Amount : {activeOrderData?.amount_to_be_collected}</h6>
                        {/* <h6 className='mb-25'>Status : {activeOrderData.status}</h6> */}
                        {/* <CardText className='mb-25'>AAAA</CardText> */}
                    </Col>
                    <Col className='p-0' xl='2'>
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
                    <Col xl='2' className='d-flex align-item-center justify-content-end'>
                        <h6 className='mb-25'> 
                        <UncontrolledDropdown>
                            {/* <Button.Ripple color="primary">Actions
                            </Button.Ripple> */}
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
                        </UncontrolledDropdown></h6>
                    </Col>                  
                </Row>
            </CardBody>       
            {/* Total & Sales Person */}
            {/* <CardBody className='invoice-padding pb-0'>
                <Row className='invoice-sales-total-wrapper'>
                    <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
                        <CardText className='mb-0'>
                            <span className='fw-bold'>Salesperson:</span> <span className='ms-75'>Alfie Solomons</span>
                        </CardText>
                    </Col>
                    <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
                        <div className='invoice-total-wrapper'>
                            <div className='invoice-total-item'>
                                <p className='invoice-total-title'>Subtotal:</p>
                                <p className='invoice-total-amount'>$1800</p>
                            </div>
                            <div className='invoice-total-item'>
                                <p className='invoice-total-title'>Discount:</p>
                                <p className='invoice-total-amount'>$28</p>
                            </div>
                            <div className='invoice-total-item'>
                                <p className='invoice-total-title'>Tax:</p>
                                <p className='invoice-total-amount'>21%</p>
                            </div>
                            <hr className='my-50' />
                            <div className='invoice-total-item'>
                                <p className='invoice-total-title'>Total:</p>
                                <p className='invoice-total-amount'>$1690</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </CardBody> */}
            {/* <hr className='invoice-spacing' /> */}
            {/* Invoice Note */}
            {/* <CardBody className='invoice-padding pt-0'>
                <Row>
                    <Col sm='12'>
                        <span className='fw-bold'>Note: </span>
                        <span>
                            It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
                            projects. Thank You!
                        </span>
                    </Col>
                </Row>
            </CardBody> */}
        </Card >

    )

}


export default OrderView
