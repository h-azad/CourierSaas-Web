

import { Row, Col } from 'reactstrap'
import React, { useState, useEffect } from 'react'
import { Drawer, Button } from 'antd'

import {
  getApi,
  CREATE_ORDER_DETAILS,
} from '../../constants/apiUrls'
import useJwt from "@src/auth/jwt/useJwt"

import OrderDetails from './OrderDetails'
import SwalConfirm from '../SwalConfirm'
import toast from 'react-hot-toast'
import SwalAlert from '../SwalAlert'

import { useDispatch, useSelector } from "react-redux"



const OrderDetailsDrawer = ({ orderid, open, onCloseOrderDetailsDrawer }) => {
  const [createOrderInfo, setCreateOrderInfo] = useState(null)
  const [active, setActive] = useState('1')

  const { userData: _userData } = useSelector((state) => state.authentication)
  const { applicationData: _applicationData } = useSelector((state) => state.authentication)


  const fetchCreateOrderDetailsData = () => {
    return useJwt
      .axiosGet(getApi(CREATE_ORDER_DETAILS) + orderid + "/")
      .then((res) => {
        setCreateOrderInfo(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }


  const acceptOrder = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`Are you sure accept order!`, "Accept").then(
      function (result) {
        if (result.value) {
          useJwt
            // .axiosDelete(getApi(CREATE_ORDER_DELETE + id + "/"))
            .axiosGet(getApi(`${CREATE_ORDER_DETAILS}${id}/assign_order/`))
            .then((res) => {
              SwalAlert("Order Assing Successfully")
              toast.success("Order Assign Successfully")
            })
        }
      }
    )
  }

  useEffect(() => {
    if (orderid !== undefined) {
      fetchCreateOrderDetailsData()
    }
  }, [orderid])

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return (
    <>
      <Drawer size="large" title="Order Details" placement="right" onClose={onCloseOrderDetailsDrawer} open={open}>
        <div className='app-user-view'>
          {/* {_userData.role == null && _userData?.is_admin == true && createOrderInfo?.status == 'pending' && _applicationData?.pickup_auto_assing_to_rider == true ?
            <Button type="primary" onClick={(e) => { acceptOrder(e, createOrderInfo?.id) }}>Accept</Button> :
            null
    
          } */}
          
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