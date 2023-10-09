import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button } from "reactstrap"
import { Link } from 'react-router-dom'
import Breadcrumbs from "@components/breadcrumbs"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import useJwt from '@src/auth/jwt/useJwt'
import ListTable from "./partials/list-table"
import { Home, Box, Truck, CornerDownLeft } from 'react-feather'

import { getApi, ORDER_STATISTICS } from "@src/constants/apiUrls"

import toast from 'react-hot-toast'

function ReturnOrderToMarcahntLits() {
  const [orderStatistics, setOrderStatistics] = useState({
    pending_orders: 0,
    in_warehouse_orders: 0,
    shipped_orders: 0,
    return_orders: 0
  })

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

      {/* <Row>
        <Col sm="12">
          <Card title="Bordered">
            <CardBody>                           */}
      <ListTable />
      {/* </CardBody>
          </Card>
        </Col>
      </Row> */}
    </Fragment>
  )
}

export default ReturnOrderToMarcahntLits
