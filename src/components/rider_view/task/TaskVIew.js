import React from 'react'
import { Card, CardBody, CardText, Row, Col, Table, Tooltip } from 'reactstrap'
import { useEffect, useState } from 'react'
import { formatDate } from '@utils'
import useJwt from '@src/auth/jwt/useJwt'
import SwalConfirm from "../../SwalConfirm"
import { getApi, CREATE_ORDER_LIST, RIDER_PICKUP } from "@src/constants/apiUrls"
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

    const [pickupData, setPickupData] = useState([])

    console.log("pickupData", pickupData)
    const [statusModalState, setStatusModalState] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [selectedInfo, setSelectedInfo] = useState(null)

    const fetchPickupData = () => {
        return useJwt
            .axiosGet(getApi(RIDER_PICKUP))
            .then((res) => {
                console.log("res", res.data)
                setPickupData(res.data.data)

                return res.data
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchPickupData()
    }, [])

    useEffect(() => {
        if (!statusModalState) {
            clearData()
        }
        fetchPickupData()
    }, [statusModalState])

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
    const handleChange = (value) => {
        console.log(`selected ${value}`)
    }

    return (<>
        <div className='invoice-title-card'>
            <h3> Pickup Task  </h3>

        </div>
        <hr></hr>
        {pickupData &&
            pickupData.map((info) => (
        <Card className='invoice-preview-card'>
            <CardBody>
                <Row >
                    <Col xl='9'>
                                <h5 className='mb-25'><b>Parcel Id :{info?.parcel_id}  </b> </h5>
                                <h9 className='mb-25'>Created:{info.created_at} </h9>
                    </Col>
                </Row>
                <Row className='mt-2' >
                    <Col xl='7'>
                                <h6 className='mb-25'><b>Recipient Name :{info?.recipient_name}</b>  </h6>
                                <h6 className='mb-25'>Phone Number :  {info?.phone_number}</h6>
                                <h6 className='mb-25'>Delivary Address : {info?.delivary_address}</h6>
                        <h6 className='mb-25 '> Pickup Status : <span className='highlight-status'>
                            <Select
                                defaultValue="No"
                                style={{
                                    width: 120,
                                }}
                                bordered={false}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'No',
                                        label: 'No',
                                     
                                    },
                                    {
                                        value: 'Yes',
                                        label: 'Yes',
                                    },        
                                ]}
                            /></span></h6>

                    </Col>
                    <Col xl='5'>
                                <h6 className='mb-25'>Product type :{info.product_type.product_type} </h6>
                                <h6 className='mb-25'>Shipment type :{info.shipment_type.shipment_type}</h6>
                                <h6 className='mb-25'>Delivary Charge:{info?.delivary_charge} </h6>
                                <h6 className='mb-25'>Total Amount :  {info?.amount_to_be_collected}</h6>
                    </Col>
                </Row>

            </CardBody>
            <ChangeStatusModalMarchant
                        statusModalState={statusModalState}
                        setStatusModalState={setStatusModalState}
                        orderInfo={selectedInfo}
                        fetchPickupData={fetchPickupData}
                    />

        </Card >
     ))} 
    </>
    )

}

export default PickupView
