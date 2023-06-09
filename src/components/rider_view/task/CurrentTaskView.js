import React from 'react'
import { Card, CardBody,  Row, Col,} from 'reactstrap'
import { useEffect, useState } from 'react'
import useJwt from '@src/auth/jwt/useJwt'
import { DownOutlined, EyeOutlined } from '@ant-design/icons'
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
import ChangeStatusModalRider from '../../rider_view/task/delivary/DelivaryStatusModal'
import { getApi, RIDER_CURRENT_TASK_LIST } from "@src/constants/apiUrls"
import {
    Badge,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
} from "reactstrap"


const CurrentTaskView = ({ currentTask }) => {
    const [statusModalState, setStatusModalState] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [selectedInfo, setSelectedInfo] = useState(null)
    // const [currentTask, setCurrentTask] = useState([])


    useEffect(() => {
        if (!statusModalState) {
            clearData()
        }
        fetchCurrentTaskData()
    }, [statusModalState])

    const fetchCurrentTaskData = () => {
        return useJwt
            .axiosGet(getApi(RIDER_CURRENT_TASK_LIST))
            .then((res) => {
                console.log(res.data)
                setCurrentTask(res.data.data)
                return res.data
            })
            .catch((err) => console.log(err))
    }
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
            <h4> List Current Task </h4>
        </div>
        <hr></hr>
        {currentTask &&
            currentTask.map((info) => (
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
                                        <EyeOutlined /><a href={"/rider-orders/task-view/" + info?.id}> View</a>
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
                                            <DropdownItem href="/" onClick={e => changeStatusAction(e, info)}>
                                                <Edit3 className="me-50" size={15} />{" "}
                                                <span className="align-middle">Change Delivary Status</span>
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
                            <h6 className='mb-25 '>Delivary Status : <span className='highlight-status'>{info.status}</span></h6>
                            <h6 className='mb-25'>Pickup Status :<span className='highlight-pickup-status'>{info.pickup_status == true ? 'True' : 'False'}</span></h6>
                        </Col>
                        <Col xl='5'>
                            <h6 className='mb-25'>Product type : {info.product_type.product_type}</h6>
                            <h6 className='mb-25'>Shipment type : {info.shipment_type.shipment_type}</h6>
                            <h6 className='mb-25'>Delivary Charge: {info?.delivary_charge}</h6>
                            <h6 className='mb-25'>Total Amount : {info?.amount_to_be_collected}</h6>
                        </Col>
                    </Row>
                </CardBody>
                    <ChangeStatusModalRider
                        statusModalState={statusModalState}
                        setStatusModalState={setStatusModalState}
                        taskInfo={selectedInfo}
                        fetchCurrentTaskData={fetchCurrentTaskData}
                    />
                </Card >
            ))}
        </>
    )

}

export default CurrentTaskView