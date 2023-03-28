import React from 'react'
import { Card, CardBody, CardText, Row, Col, Table, Tooltip } from 'reactstrap'
import { Facebook, Instagram, Twitter } from 'react-feather'
import { useEffect, useState } from 'react'
import { formatDate } from '@utils'
import useJwt from '@src/auth/jwt/useJwt'
import { Link } from "react-router-dom"
import SwalAlert from "../../SwalAlert"
import SwalConfirm from "../../SwalConfirm"
import { getApi, CREATE_ORDER_LIST, MARCHANT_DELETE_ORDER } from "@src/constants/apiUrls"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
import { DownOutlined, EyeOutlined } from '@ant-design/icons'
import { Dropdown, Typography, Select, Button, Space, Menu } from 'antd'
import ChangeStatusModalMarchant from '../../merchant_views/order/ChangeStatusModal'
import {
    Badge,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Label,
    Input,
} from "reactstrap"

const PickupView = ({ }) => {

    const [orders, setOrders] = useState([])

    console.log("orders", orders)
    const [statusModalState, setStatusModalState] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [selectedInfo, setSelectedInfo] = useState(null)

    const fetchCreateOrderData = () => {
        return useJwt
            .axiosGet(getApi(CREATE_ORDER_LIST))
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

    // useEffect(() => {
    //     if (!statusModalState) {
    //         clearData()
    //     }
    //     fetchCreateOrderData()
    // }, [statusModalState])

    const changeStatusAction = (e, info) => {
        e.preventDefault()
        setStatusModalState(true)
        setSelectedStatus(info.status)
        setSelectedInfo(info)
    }
    const clearData = () => {
        setSelectedInfo(null)
        setSelectedStatus(null)
    }

    return (<>
        <div className='invoice-title-card'>
            <h3> Pickup Task  </h3>
            {/* <Link to={'/marchant-orders/create'}>
                <Button type="primary" color="primary"> + Create Order</Button>
            </Link> */}
        </div>
        <hr></hr>
        {orders &&
            orders.map((info) => (
                <Card className='invoice-preview-card'>
                    <CardBody>
                        <Row >
                            <Col xl='9'>
                                <h5 className='mb-25'><b>Parcel Id :{info?.parcel_id} </b> </h5>
                                <h9 className='mb-25'>Created: {info.created_at}</h9>
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
                                            <DropdownItem href="/" onClick={e => deleteOrderAction(e, info?.id)}>
                                                <Trash className="me-50" size={15} />{" "}
                                                <span className="align-middle">Delete</span>
                                            </DropdownItem>
                                            <DropdownItem href="/" onClick={e => changeStatusAction(e, info)}>
                                                <Edit3 className="me-50" size={15} />{" "}
                                                <span className="align-middle">Change Status</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-2' >
                            <Col xl='7'>
                                <h6 className='mb-25'><b>Recipient Name :{info?.recipient_name}</b>  </h6>
                                <h6 className='mb-25'>Phone Number : {info?.phone_number}</h6>
                                <h6 className='mb-25'>Delivary Address : {info?.delivary_address}</h6>
                                <h6 className='mb-25 '>Status : <span className='highlight-status'>{info.status}</span></h6>
                                <h6 className='mb-25'>Pickup Status :{info.pickup_status0}</h6>
                                {/* <h6 className='mb-25'>Pickup Status :<Typography.Text strong>{info.pickup_status}</Typography.Text></h6> */}

                            </Col>
                            <Col xl='5'>
                                <h6 className='mb-25'>Product type : {info.product_type.product_type}</h6>
                                <h6 className='mb-25'>Shipment type : {info.shipment_type.shipment_type}</h6>
                                <h6 className='mb-25'>Delivary Charge: {info?.delivary_charge}</h6>
                                <h6 className='mb-25'>Total Amount : {info?.amount_to_be_collected}</h6>
                            </Col>
                        </Row>

                    </CardBody>
                    <ChangeStatusModalMarchant
                        statusModalState={statusModalState}
                        setStatusModalState={setStatusModalState}
                        orderInfo={selectedInfo}
                        fetchMarchantOrderData={fetchCreateOrderData}
                    />

                </Card >
            ))}
        </>
    )

}

export default PickupView
