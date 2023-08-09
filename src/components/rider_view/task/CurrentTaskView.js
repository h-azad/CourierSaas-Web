import React from 'react'
import { Card, CardBody, Row, Col, } from 'reactstrap'
import { useState } from 'react'
import { EyeOutlined } from '@ant-design/icons'
import { MoreVertical} from "react-feather"
import {
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap"

import OrderDetailsDrawer from '../../order/OrderDetailsDrawer'
import { Pagination } from 'antd'

const CurrentTaskView = ({ currentTaskData }) => {
  const [orderid, setOrderId] = useState(0)
  const [open, setOpen] = useState(false)
  const showOrderDetailsDrawer = () => {
    setOpen(true)
  }
  const onCloseOrderDetailsDrawer = () => {
    setOpen(false)
  }

  return (
  <>
    <div className='invoice-title-card'>
      <h4> List Current Task </h4>
    </div>
    <hr></hr>
    <OrderDetailsDrawer open={open} orderID={orderid} showOrderDetailsDrawer={showOrderDetailsDrawer} onCloseOrderDetailsDrawer={onCloseOrderDetailsDrawer} />

    {currentTaskData.currentTask &&
      currentTaskData.currentTask.map((info) => (
        <Card className='invoice-preview-card'>
          <CardBody>
            <Row >
              <Col xl='9'>
                <h5 className='mb-25'><b>Parcel Id :{info?.parcel_id} </b> </h5>
                <h9 className='mb-25'>Created: {info.created_at}</h9>
              </Col>
              <Col xl='3'>
                <div className='button-wrapper'>
                  <button className="action-view" type="primary" onClick={() => { setOrderId(info?.id), showOrderDetailsDrawer() }}>
                    <EyeOutlined />
                    View
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
                  </UncontrolledDropdown>
                </div>
              </Col>
            </Row>
            <Row className='mt-2' >
              <Col xl='7'>
                <h6 className='mb-25'><b>Recipient Name :{info?.recipient_name}</b>  </h6>
                <h6 className='mb-25'>Phone Number : {info?.phone_number}</h6>
                <h6 className='mb-25'>Delivary Address : {info?.delivary_address}</h6>
                <h6 className='mb-25 '>Order Status : <span className='highlight-status'>{info.status}</span></h6>
                <h6 className='mb-25'>Pickup Status :<span className='highlight-pickup-status'>{info.pickup_status == true ? 'True' : 'False'}</span></h6>
                <h6 className='mb-25'>Delivery Status :<span className='highlight-pickup-status'>{info.delivery_status == true ? 'True' : 'False'}</span></h6>
              </Col>
              <Col xl='5'>
                <h6 className='mb-25'>Warehouse Status :<span className='highlight-pickup-status'>{info.warehouse_status == true ? 'True' : 'False'}</span></h6>
                <h6 className='mb-25'>Product type : {info.product_type.product_type}</h6>
                <h6 className='mb-25'>Shipment type : {info.shipment_type.shipment_type}</h6>
                <h6 className='mb-25'>Delivary Charge: {info?.delivary_charge}</h6>
                <h6 className='mb-25'>Collection Amount : {info?.amount_to_be_collected}</h6>
                <h6 className='mb-25'>Total Amount : {Number(info?.amount_to_be_collected) + Number(info?.delivary_charge)}</h6>
              </Col>
            </Row>
          </CardBody>
        </Card >
      ))}
    <Pagination onChange={currentTaskData.paginationUpdate} total={currentTaskData.orderCount} defaultPageSize={50} />
  </>
  )

}

export default CurrentTaskView