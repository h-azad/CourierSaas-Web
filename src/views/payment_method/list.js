import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button } from "reactstrap"
import { Link } from 'react-router-dom'
import Breadcrumbs from "@components/breadcrumbs"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { Send, User, UserCheck, UserPlus, UserX } from "react-feather"
import ListTable from "./partials/list-table"
import { getApi, PAYMENT_METHOD_STATISTICS } from "@src/constants/apiUrls"
import useJwt from '@src/auth/jwt/useJwt'

function PaymentMethodList() {

  const [paymentMethodStatistics, setPaymentMethodStatistics] = useState({
    total: 0,
    // pending: 0,
    active: 0,
    inactive: 0,
  })

  const fetchPaymentMethodStatisticsData = () => {
    return useJwt
      .axiosGet(getApi(PAYMENT_METHOD_STATISTICS))
      .then((res) => {
        setPaymentMethodStatistics(
          {
            total: res.data.total,
            // pending: res.data.pending,
            active: res.data.active,
            inactive: res.data.inactive,
          })
      })
      .catch((err) => console.log(err))
  }


  useEffect(() => {
    fetchPaymentMethodStatisticsData()
  }, [])

  return (
    <Fragment>
      <Row>
        <Col lg="4" sm="6">
          <StatsHorizontal
            statTitle="Payment Methods"
            icon={<Send size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{paymentMethodStatistics?.total}</h3>}
          />
        </Col>
        {/* <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending"
            icon={<Send size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{paymentMethodStatistics?.pending}</h3>}
          />
        </Col> */}
        <Col lg="4" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active"
            icon={<Send size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{paymentMethodStatistics?.active}</h3>}
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Inactive"
            icon={<Send size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{paymentMethodStatistics?.inactive}</h3>}
          />
        </Col>
      </Row>

      <Row>
        <Col sm="12">
          <Card title="Bordered">
            <CardBody>
              <ListTable />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default PaymentMethodList
