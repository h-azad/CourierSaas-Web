import React from 'react'
import { Card, CardBody, CardText, Row, Col, Table, Tooltip } from 'reactstrap'
import { Facebook, Instagram, Twitter } from 'react-feather'
import { useEffect, useState } from 'react'
import { formatDate } from '@utils'
import useJwt from '@src/auth/jwt/useJwt'
import { Link } from "react-router-dom"
import { getApi, MARCHANT_ORDER_LIST } from "@src/constants/apiUrls"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
import { DownOutlined, EyeOutlined } from '@ant-design/icons'
import { Dropdown, Select, Button, Space, Menu } from 'antd'
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

const OrderView = ({ activeOrderData }) => {
    console.log("activeOrderData", activeOrderData)

    return (<>
        <div className='invoice-title-card'>
            <h3> Orders  </h3>
            <Link to={'/marchant-orders/create'}>
                <Button type="primary" color="primary"> + Create Order</Button>
            </Link>
        </div>
        <hr></hr>

        <Card className='invoice-preview-card'>
            <CardBody>
                <Row >
                    <Col xl='9'>
                        {/* <h6 className='mb-2'>Invoice To:</h6> */}
                        <h6 className='mb-25'><b>Parcel Id :{activeOrderData?.parcel_id} </b> </h6>
                        <h6 className='mb-25'><b>Recipient Name :{activeOrderData?.recipient_name}</b>  </h6>
                        <h6 className='mb-25'>Phone Number : {activeOrderData?.phone_number}</h6>
                        <h6 className='mb-25'>Delivary Address : {activeOrderData?.delivary_address}</h6>
                        <h6 className='mb-25'>Delivary Charge: {activeOrderData?.delivary_charge}</h6>
                        <h6 className='mb-25'>Total Amount : {activeOrderData?.amount_to_be_collected}</h6>
                        {/* <h6 className='mb-25'>Status : {activeOrderData.status}</h6> */}
                        {/* <CardText className='mb-25'>AAAA</CardText> */}
                    </Col>
                    <Col xl='3'>
                        <div className='button-wrapper'>
                            <button className='action-view'>
                                <EyeOutlined />
                                <a href={"/marchant-orders/view/" + activeOrderData?.id}> View</a>
                            </button>
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
                            </UncontrolledDropdown>
                        </div>


                        {/* <Space direction="vertical">
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
                            </UncontrolledDropdown>
                           
                            <Dropdown.Button
                                menu={{
                                    items,
                                    onClick: onMenuClick,
                                }}
                            >
                                Actions
                            </Dropdown.Button>
                        </Space> */}
                    </Col>
                </Row>

            </CardBody>
        </Card >
        <Card className='invoice-preview-card'>
            <CardBody>
                <Row >
                    <Col xl='9'>
                        {/* <h6 className='mb-2'>Invoice To:</h6> */}
                        <h6 className='mb-25'><b>Parcel Id :{activeOrderData?.parcel_id} </b> </h6>
                        <h6 className='mb-25'><b>Recipient Name :{activeOrderData?.recipient_name}</b>  </h6>
                        <h6 className='mb-25'>Phone Number : {activeOrderData?.phone_number}</h6>
                        <h6 className='mb-25'>Delivary Address : {activeOrderData?.delivary_address}</h6>
                        <h6 className='mb-25'>Delivary Charge: {activeOrderData?.delivary_charge}</h6>
                        <h6 className='mb-25'>Total Amount : {activeOrderData?.amount_to_be_collected}</h6>
                        {/* <h6 className='mb-25'>Status : {activeOrderData.status}</h6> */}
                        {/* <CardText className='mb-25'>AAAA</CardText> */}
                    </Col>
                    <Col xl='3'>
                        <div className='button-wrapper'>
                            <button className='action-view'>
                                <EyeOutlined />
                                <a href={"/marchant-orders/view/" + activeOrderData?.id}> View</a>
                            </button>
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
                            </UncontrolledDropdown>
                        </div>


                        {/* <Space direction="vertical">
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
                            </UncontrolledDropdown>
                           
                            <Dropdown.Button
                                menu={{
                                    items,
                                    onClick: onMenuClick,
                                }}
                            >
                                Actions
                            </Dropdown.Button>
                        </Space> */}
                    </Col>
                </Row>

            </CardBody>
        </Card >
    </>



    )

}


export default OrderView
