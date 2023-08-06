

import { Row, Col } from 'reactstrap'
import React, { useState, useEffect } from 'react'
import { Drawer } from 'antd'

import {
  getApi,
  CREATE_ORDER_DETAILS,
} from '../../constants/apiUrls'
import useJwt from "@src/auth/jwt/useJwt"

import OrderDetails from './OrderDetails'

const OrderDetailsDrawer = ({ orderID, open, onCloseOrderDetailsDrawer }) => {
  const [createOrderInfo, setCreateOrderInfo] = useState(null)
  const [active, setActive] = useState('1')

  console.log('Yser open this page', orderID)
  const fetchCreateOrderDetailsData = () => {
    return useJwt
      .axiosGet(getApi(CREATE_ORDER_DETAILS) + orderID + "/")
      .then((res) => {
        setCreateOrderInfo(res.data)
        console.log('response data')
        return res.data
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchCreateOrderDetailsData()
  }, [orderID])

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return (
    <>
      <Drawer size="large" title="Order Details" placement="right" onClose={onCloseOrderDetailsDrawer} open={open}>
        <div className='app-user-view'>
          {createOrderInfo &&
            <Row>
              <Col xl='12' lg='12' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
                <OrderDetails active={active} toggleTab={toggleTab} orderDetails={createOrderInfo} />
              </Col>
            </Row>
          }
        </div>
      </Drawer>
    </>
  )
}
export default OrderDetailsDrawer