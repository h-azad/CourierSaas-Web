import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button } from "reactstrap"
import { Link } from 'react-router-dom'
import Breadcrumbs from "@components/breadcrumbs"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { Cpu, User, UserCheck, UserPlus, UserX } from "react-feather"
import ListTable from "./partials/list-table"
import { getApi, PRICING_POLICY_STATISTICS } from "@src/constants/apiUrls"
import useJwt from '@src/auth/jwt/useJwt'

function PricingPolicyList() {

  const [pricingPolicyStatistics, setPricingPolicyStatistics] = useState({
    total: 0,
    pending: 0,
    active: 0,
    inactive: 0,
  })

  const fetchPricingPolicyStatisticsData = () => {
    return useJwt
      .axiosGet(getApi(PRICING_POLICY_STATISTICS))
      .then((res) => {
        setPricingPolicyStatistics(
          {
            total: res.data.total,
            pending: res.data.pending,
            active: res.data.active,
            inactive: res.data.inactive,
          })
      })
      .catch((err) => console.log(err))
  }


  useEffect(() => {
    fetchPricingPolicyStatisticsData()
  }, [])

  return (
    <Fragment>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            statTitle="Total PricingPolicy"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{pricingPolicyStatistics?.total}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{pricingPolicyStatistics?.pending}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{pricingPolicyStatistics?.active}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Inactive"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{pricingPolicyStatistics?.inactive}</h3>}
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

export default PricingPolicyList
