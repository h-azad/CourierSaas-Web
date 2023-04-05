import React from 'react'
import { Card, CardBody,  Row, Col,} from 'reactstrap'
import { useEffect, useState } from 'react'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, RIDER_CURRENT_TASK_LIST } from "@src/constants/apiUrls"


const CurrentTaskView = () => {
    const [currentTask, setCurrentTask] = useState([])
    useEffect(() => {
        fetchCurrentTaskData()
    }, [])

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
                        </Col>
                    </Row>
                    <Row className='mt-2' >
                        <Col xl='7'>
                            <h6 className='mb-25'><b>Recipient Name :{info?.recipient_name}</b>  </h6>
                            <h6 className='mb-25'>Phone Number : {info?.phone_number}</h6>
                            <h6 className='mb-25'>Delivary Address : {info?.delivary_address}</h6>
                            <h6 className='mb-25 '>Delivary Status : <span className='highlight-status'>{info.status}</span></h6>
                            <h6 className='mb-25'>Pickup Status :{info.pickup_status == true ? 'True' : 'False'}</h6>

                        </Col>
                        <Col xl='5'>
                            <h6 className='mb-25'>Product type : {info.product_type.product_type}</h6>
                            <h6 className='mb-25'>Shipment type : {info.shipment_type.shipment_type}</h6>
                            <h6 className='mb-25'>Delivary Charge: {info?.delivary_charge}</h6>
                            <h6 className='mb-25'>Total Amount : {info?.amount_to_be_collected}</h6>
                        </Col>
                    </Row>

                </CardBody>

                </Card >
            ))}
        </>
    )

}

export default CurrentTaskView