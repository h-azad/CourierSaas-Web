import React from 'react'
import { Card, CardBody, CardText, Row, Col, Table, Tooltip } from 'reactstrap'
import { useEffect, useState } from 'react'
import { formatDate } from '@utils'
import useJwt from '@src/auth/jwt/useJwt'
import SwalConfirm from "../../SwalConfirm"
import { getApi, CREATE_ORDER_LIST, RIDER_DELIVARY_STATUS_UPDATE, RIDER_DELIVARY } from "@src/constants/apiUrls"
import { Dropdown, Typography, Select, Button, Space, Menu } from 'antd'
import PickupStatusModal from '../../rider_view/task/PickupStatusModal'
import { string } from 'yup'
import toast from 'react-hot-toast'


const DelivaryView = ({ }) => {

    const [delivaryData, setDelivaryData] = useState([])
    const [statusModalState, setStatusModalState] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [selectedInfo, setSelectedInfo] = useState(null)

    const fetchDelivaryData = () => {
        return useJwt
            .axiosGet(getApi(RIDER_DELIVARY))
            .then((res) => {
                console.log("res", res.data)
                setDelivaryData(res.data.data)

                return res.data
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchDelivaryData()
    }, [])

    useEffect(() => {
        if (!statusModalState) {
            clearData()
        }
        fetchDelivaryData()
    }, [statusModalState])

    const updateStatusAction = (e) => {
        e.preventDefault()
        console.log("selectedInfo", selectedInfo)
        console.log("selectedStatus", selectedStatus)
        return false

    }


    const clearData = () => {
        setSelectedInfo(null)
        setSelectedStatus(null)
    }

    const updateStatusActionx = (selectedValue, id) => {
        const formData = {
            'status': selectedValue
        }
        console.log("formData", formData)

        useJwt
            .axiosPatch(getApi(RIDER_DELIVARY_STATUS_UPDATE) + `${id}/`, formData)
            .then((res) => {
                toast.success('Delivary Status Updated Successfully!')
                setStatusModalState(false)
                fetchPickupData()
            })
            .catch(err => {
                toast.success('Delivary Status Updated Failed!')
                setStatusModalState(false)
            })

    }
    const handleChange = (id, selectedValue) => {
        // console.log(`selected xxx ${value}`)
        updateStatusActionx(selectedValue, id)
    }

    const changeStatusAction = (e, info) => {
        e.preventDefault()
        console.log(`selected xxx ${value}`)

        setStatusModalState(true)
        setSelectedStatus(info.status)
        setSelectedInfo(info)
    }

    return (<>
        <div className='invoice-title-card'>
            <h3> Delivary Task  </h3>

        </div>
        <hr></hr>
        {delivaryData &&
            delivaryData.map((info) => (
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
                                {/* <h6 className='mb-25 '> Pickup Status : <span className='highlight-status'> */}
                                <h6 className='mb-25 '> Delivary Status : <span className='highlight-status'>
                                    <Select
                                        defaultValue="No"
                                        style={{
                                            width: 120,
                                        }}
                                        bordered={false}
                                        onChange={(value) => handleChange(info.id, value)}
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
                    <PickupStatusModal
                        statusModalState={statusModalState}
                        setStatusModalState={setStatusModalState}
                        Info={selectedInfo}
                        fetchDelivaryData={fetchDelivaryData}
                    />

                </Card >
            ))}
    </>
    )

}


export default DelivaryView
