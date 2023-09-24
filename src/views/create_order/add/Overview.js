import React from 'react'
import {
  Button,
} from "reactstrap"

import { Card, Col, Row } from 'antd'

const Overview = ({ overViewData }) => {

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Recipient Info" bordered={false}>
          <p><span style={{ fontWeight: 'bold' }}>Recipient Name</span> : {overViewData?.recipientName}</p>
          <p><span style={{ fontWeight: 'bold' }}>Phone</span> : {overViewData?.phoneNumber}</p>
          <p><span style={{ fontWeight: 'bold' }}>Delivery Address</span> : {overViewData?.delivaryAddress}</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Parcel Info" bordered={false}>
          <p><span style={{ fontWeight: 'bold' }}>Order Type</span> : {overViewData?.orderType?.label}</p>
          <p><span style={{ fontWeight: 'bold' }}>Product Type</span> : {overViewData?.productTypeData?.label}</p>
          <p><span style={{ fontWeight: 'bold' }}>Percel Type</span> : {overViewData?.percellTypeData?.label}</p>
          <p><span style={{ fontWeight: 'bold' }}>Shipment Type</span> : {overViewData?.shipmentData?.label}</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Parcel Item" bordered={false}>
          <p><span style={{ fontWeight: 'bold' }}>Product Details</span> : {overViewData?.productDetails}</p>
          <p><span style={{ fontWeight: 'bold' }}>Quantity</span> : {overViewData?.itemQuentity}</p>
        </Card>
      </Col>
      <Col>
        <div className="d-flex">

          {overViewData.currentStep > 0 && (
            <Button className="me-1" color="primary"
              style={{
                margin: '0 8px',
              }}
              onClick={() => overViewData.prev()}
            >
              Previous
            </Button>
          )}

          {overViewData.currentStep === overViewData?.stepsData?.length - 1 && (
            <Button className="me-1" color="primary" type="submit"
             onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
        </div>
      </Col>
    </Row>
  )
}
export default Overview