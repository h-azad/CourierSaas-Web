import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button } from "reactstrap"
import { Link } from 'react-router-dom'
import Breadcrumbs from "@components/breadcrumbs"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { Cpu, User, UserCheck, UserPlus, UserX } from "react-feather"
import useJwt from '@src/auth/jwt/useJwt'
import ListTable from "./partials/list-table"
import OrdersList from "../../../components/merchant_views/order/OrdersList"
import OrderView from "../../../components/merchant_views/order/OrderView"
import { getApi, MARCHANT_ORDER_LIST, SEARCH_MARCHANT_PARCEL } from "../../../constants/apiUrls"

function MerchantOrdersList() {

  const [activeOrder, setActiveOrder] = useState()
  const [orders, setOrders] = useState([])
  const [activeOrderData, setActiveOrderData] = useState(null)


  const fetchCreateOrderData = () => {
    return useJwt
      .axiosGet(getApi(MARCHANT_ORDER_LIST))
      .then((res) => {
        console.log("res", res.data)
        setOrders(res.data.data)
        setActiveOrderData(res.data.data[0])
        return res.data
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchCreateOrderData()
  }, [])

  useEffect(() => {
    console.log(activeOrder)
    if (orders && !activeOrder) {
      // console.log(orders[0])
      orders[0] ? setActiveOrder(orders[0]?.id) : null
      
    }
  }, [orders])

  useEffect(() => {
    
    const activeOrderFilter = orders.find((item) => item.id === activeOrder)
    setActiveOrderData(activeOrderFilter)
  }, [activeOrder])


  return (
    <Fragment>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Users"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">21,459</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Paid Users"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active Users"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending Users"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">237</h3>}
          />
        </Col>
      </Row>

      <Row>
        <Col sm="4">
          <Card title="Bordered">
            <CardBody>
              <OrdersList setActiveOrderData={setActiveOrderData} orders={orders} setOrders={setOrders} activeOrder={activeOrder}  setActiveOrder={setActiveOrder} />                          
              {/* <ListTable /> */}
            </CardBody>
          </Card>
        </Col>
        <Col sm="8">
          <Card title="Bordered">
            <CardBody>                          
              {/* <ListTable /> */}
              <OrderView activeOrderData={activeOrderData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default MerchantOrdersList
