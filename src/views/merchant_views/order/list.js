import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button } from "reactstrap"
import { Link } from 'react-router-dom'
import Breadcrumbs from "@components/breadcrumbs"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { Home, Box, Truck, CornerDownLeft } from 'react-feather'
import useJwt from '@src/auth/jwt/useJwt'
import ListTable from "./partials/list-table"
import OrdersList from "../../../components/merchant_views/order/OrdersList"
import OrderView from "../../../components/merchant_views/order/OrderView"
import { getApi, MARCHANT_ORDER_LIST, ORDER_STATISTICS } from "../../../constants/apiUrls"

function MerchantOrdersList() {

  const [activeOrder, setActiveOrder] = useState()
  const [orders, setOrders] = useState([])
  const [activeOrderData, setActiveOrderData] = useState(null)
  const [orderStatistics, setOrderStatistics] = useState({
    pending_orders: 0,
    in_warehouse_orders: 0,
    shipped_orders: 0,
    return_orders: 0
  })


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




  const fetchOrderStatisticsData = () => {
    return useJwt
      .axiosGet(getApi(ORDER_STATISTICS))
      .then((res) => {
        setOrderStatistics(
          {
            pending_orders: res.data.pending_orders,
            in_warehouse_orders: res.data.in_warehouse_orders,
            shipped_orders: res.data.shipped_orders,
            return_orders: res.data.return_orders,
          })
      })
      .catch((err) => console.log(err))
  }


  useEffect(() => {
    fetchOrderStatisticsData()
  }, [])


  return (
    <Fragment>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Pending"
            icon={<Box size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{orderStatistics?.pending_orders}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="WireHouse"
            icon={<Home size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{orderStatistics?.in_warehouse_orders}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Shipped"
            icon={<Truck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{orderStatistics?.shipped_orders}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Return"
            icon={<CornerDownLeft size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{orderStatistics?.return_orders}</h3>}
          />
        </Col>
      </Row>

      <Row>
        <Col sm="4">
          <Card title="Bordered">
            <CardBody>
              <OrdersList setActiveOrderData={setActiveOrderData} orders={orders} setOrders={setOrders} activeOrder={activeOrder} setActiveOrder={setActiveOrder} fetchCreateOrderData={fetchCreateOrderData} />
              {/* <ListTable /> */}
            </CardBody>
          </Card>
        </Col>
        <Col sm="8">
          <Card title="Bordered">
            <CardBody>
              {/* <ListTable /> */}
              <OrderView activeOrderData={activeOrderData} orders={orders} fetchCreateOrderData={fetchCreateOrderData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default MerchantOrdersList
