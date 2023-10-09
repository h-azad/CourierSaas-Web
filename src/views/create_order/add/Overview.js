import React from 'react'
import {
  Button,
} from "reactstrap"

import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  CREATE_ORDER_ADD,
} from "@src/constants/apiUrls"
import { useNavigate } from "react-router-dom"
import SwalAlert from '@src/components/SwalAlert'
import toast from 'react-hot-toast'

import { Card, Col, Row, message } from 'antd'

const Overview = ({ overViewData }) => {
  const navigate = useNavigate()

  const onSubmitOrder = () => {
    console.log('onSubmit clicked')
    if (
      overViewData.marchant.value !== null &&
      overViewData.recipientName !== null &&
      overViewData.phoneNumber !== null &&
      overViewData.delivaryAddress !== null &&
      overViewData.amountCollected !== null &&
      overViewData.productTypeData.value !== null &&
      overViewData.city.value !== null &&
      overViewData.area.value !== null &&
      overViewData.deliveryCharge !== null &&
      overViewData.percellTypeData.value !== null &&
      overViewData.shipmentData.value !== null &&
      overViewData.orderType !== null
    ) {
      let formData = {
        marchant: overViewData.marchant.value,
        recipient_name: overViewData.recipientName,
        phone_number: overViewData.phoneNumber,
        delivary_address: overViewData.delivaryAddress,
        amount_to_be_collected: overViewData.amountCollected,
        product_type: overViewData.productTypeData.value,
        delivary_area: overViewData.area.value,
        delivary_city: overViewData.city.value,
        pricing_policy: overViewData.percellTypeData.value,
        shipment_type: overViewData.shipmentData.value,
        delivary_charge: overViewData.deliveryCharge,
        order_type: overViewData.orderType.value,
        parcel_items: overViewData.parcelItems,
      }

      // console.log("formData", formData)

      useJwt
        .axiosPost(getApi(CREATE_ORDER_ADD), formData)
        .then((res) => {
          SwalAlert("Order Created Successfully")
          toast.success('Order Created Successfully') 
          navigate("/create_order")
        })
        .catch((err) => console.log(err))
    }
  }



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
          <p><span style={{ fontWeight: 'bold' }}>Marchant</span> : {overViewData?.marchant?.label}</p>
          <p><span style={{ fontWeight: 'bold' }}>Order Type</span> : {overViewData?.orderType?.label}</p>
          <p><span style={{ fontWeight: 'bold' }}>Product Type</span> : {overViewData?.productTypeData?.label}</p>
          <p><span style={{ fontWeight: 'bold' }}>Percel Type</span> : {overViewData?.percellTypeData?.label}</p>
          <p><span style={{ fontWeight: 'bold' }}>Shipment Type</span> : {overViewData?.shipmentData?.label}</p>
          <p><span style={{ fontWeight: 'bold' }}>City</span> : {overViewData?.city?.label}</p>
          <p><span style={{ fontWeight: 'bold' }}>Area</span> : {overViewData?.area?.label}</p>
          <p><span style={{ fontWeight: 'bold' }}>Collected Amount</span> : {overViewData?.amountCollected}</p>
          <p><span style={{ fontWeight: 'bold' }}>Delivery Charge</span> : {overViewData?.deliveryCharge}</p>
          <p><span style={{ fontWeight: 'bold' }}>Total</span> : { Number(overViewData?.amountCollected) +  Number(overViewData?.deliveryCharge)} </p>

        </Card>
      </Col>
      <Col span={8}>
        <Card title="Parcel Item" bordered={false}>
          {overViewData.parcelItems.map((item, index) => (
            <div key={index}>
              <p><span style={{ fontWeight: 'bold' }}>Product Details</span> : {item?.item_details}</p>
              <p><span style={{ fontWeight: 'bold' }}>Quantity</span> : {item?.item_quantity}</p>
            </div>
          ))}
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
              // onClick={() => {onSubmitOrder, message.success('Processing complete!')}}>
              onClick={onSubmitOrder}>
              Done
            </Button>
          )}
        </div>
      </Col>
    </Row>
  )
}
export default Overview