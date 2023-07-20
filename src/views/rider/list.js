import React, { Fragment, useState, useEffect } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { User, UserCheck, UserPlus, UserX } from "react-feather"
import ListTable from "./partials/list-table"

import { getApi, RIDER_STATISTICS } from "@src/constants/apiUrls"
import useJwt from '@src/auth/jwt/useJwt'

function RiderList() {

  const [riderStatistics, setRiderStatistics] = useState({
    total: 0,
    // pending: 0,
    active: 0,
    inactive: 0,
  })

  const fetchRiderStatisticsData = () => {
    return useJwt
      .axiosGet(getApi(RIDER_STATISTICS))
      .then((res) => {
        setRiderStatistics(
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
    fetchRiderStatisticsData()
  }, [])

  return (
    <Fragment>
      <Row>
        <Col lg="4" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Rider"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{riderStatistics?.total}</h3>}
          />
        </Col>
        {/* <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{riderStatistics?.pending}</h3>}
          />
        </Col> */}
        <Col lg="4" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{riderStatistics?.active}</h3>}
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Inactive"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{riderStatistics?.inactive}</h3>}
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

export default RiderList
