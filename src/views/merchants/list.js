import React, { Fragment, useEffect, useState } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { Cpu, Search, User, UserCheck, UserPlus, UserX } from "react-feather"
import ListTable from "./partials/list-table"
import { getApi, MARCHANT_STATISTICS } from "@src/constants/apiUrls"
import useJwt from '@src/auth/jwt/useJwt'


function MerchantList() {

  const [marchantStatistics, setMarchantStatistics] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    inactive: 0,
  })

  const fetchMarchantStatisticsData = () => {
    return useJwt
      .axiosGet(getApi(MARCHANT_STATISTICS))
      .then((res) => {
        setMarchantStatistics(
          {
            total: res.data.total,
            pending: res.data.pending,
            approved: res.data.approved,
            inactive: res.data.inactive,
          })
      })
      .catch((err) => console.log(err))
  }


  useEffect(() => {
    fetchMarchantStatisticsData()
  }, [])

  return (
    <Fragment>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            statTitle="Total Marchant"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{marchantStatistics?.total}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{marchantStatistics?.pending}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Approved"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{marchantStatistics?.approved}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Inactive"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{marchantStatistics?.inactive}</h3>}
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

export default MerchantList
