import React from 'react'
import { Card, CardBody, CardText, Row, Col, Table, Tooltip } from 'reactstrap'
import { Facebook, Instagram, Twitter } from 'react-feather'
import { useEffect, useState } from 'react'
import { formatDate } from '@utils'
import useJwt from '@src/auth/jwt/useJwt'
import { Link } from "react-router-dom"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import { getApi, MARCHANT_ORDER_LIST, CREATE_ORDER_DELETE } from "@src/constants/apiUrls"
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

const OrderView = ({ activeOrderData, orders }) => {
    console.log("orders", orders)


    useEffect(() => {
        fetchCreateOrderData()
    }, [])

    const fetchCreateOrderData = () => {
        return useJwt
            .axiosGet(getApi(MARCHANT_ORDER_LIST))
            .then((res) => {
                console.log("res", res.data)
                setCreateOrder(res.data.data)
                return res.data
            })
            .catch(err => console.log(err))
    }

    const deleteAction = (e, id) => {
        e.preventDefault()
        return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
            if (result.value) {

                useJwt
                    .axiosDelete(getApi(CREATE_ORDER_DELETE + id + '/'))
                    .then((res) => {
                        SwalAlert("Deleted Successfully")
                    })
                    .finally(() => fetchCreateOrderData())

            }
        })
       
    }

    return (<>
        <div className='invoice-title-card'>
            <h3> Orders  </h3>
            <Link to={'/marchant-orders/create'}>
                <Button type="primary" color="primary"> + Create Order</Button>
            </Link>
        </div>
        <hr></hr>
        {orders &&
            orders.map((info) => (
                <Card className='invoice-preview-card'>
                    <CardBody>

                        <Row >
                            <Col xl='9'>
                                <h5 className='mb-25'><b>Parcel Id :{info?.parcel_id} </b> </h5>
                            </Col>
                            <Col xl='3'>
                                <div className='button-wrapper'>
                                    <button className='action-view'>
                                        <EyeOutlined />
                                        <a href={"/marchant-orders/view/" + info?.id}> View</a>
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
                                            <DropdownItem href={"/marchant_order/edit/" + info?.id}>
                                                <Edit className="me-50" size={15} />{" "}
                                                <span className="align-middle">Edit</span>
                                            </DropdownItem>
                                            <DropdownItem href="/" onClick={e => deleteAction(e, info?.id)}>
                                                <Trash className="me-50" size={15} />{" "}
                                                <span className="align-middle">Delete</span>
                                            </DropdownItem>
                                            <DropdownItem href="/" onClick={e => changeStatusAction(e, info?.id)}>
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

                        <Row className='mt-2' >
                            <Col xl='7'>
                                <h6 className='mb-25'><b>Recipient Name :{info?.recipient_name}</b>  </h6>
                                <h6 className='mb-25'>Phone Number : {info?.phone_number}</h6>
                                <h6 className='mb-25'>Delivary Address : {info?.delivary_address}</h6>
                                {/* <h6 className='mb-25'>Marchant: {info.marchant.full_name}</h6>                     */}
                                <h6 className='mb-25'>Status : {info.status}</h6>
                                <h6 className='mb-25'>Created: {info.created_at}</h6>
                            </Col>
                            <Col xl='5'>
                                <h6 className='mb-25'>Product type Id: {info.product_type_id}</h6>
                                <h6 className='mb-25'>Shipment type Id: {info.shipment_type_id}</h6>
                                <h6 className='mb-25'>Delivary Charge: {info?.delivary_charge}</h6>
                                <h6 className='mb-25'>Total Amount : {info?.amount_to_be_collected}</h6>
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
            ))}
    </>



    )

}


export default OrderView
