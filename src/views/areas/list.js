import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button } from "reactstrap"
import { Link } from 'react-router-dom'
import Breadcrumbs from "@components/breadcrumbs"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { Cpu, User, UserCheck, UserPlus, UserX } from "react-feather"
import ListTable from "./partials/list-table"
import { getApi, AREAS_STATISTICS } from "@src/constants/apiUrls"
import useJwt from '@src/auth/jwt/useJwt'

function AreasList() {

  const [areaStatistics, setAreaStatistics] = useState({
    total: 0,
    pending: 0,
    active: 0,
    inactive: 0,
  })

  const fetchAreaStatisticsData = () => {
    return useJwt
      .axiosGet(getApi(AREAS_STATISTICS))
      .then((res) => {
        setAreaStatistics(
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
    fetchAreaStatisticsData()
  }, [])

  return (
    <Fragment>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            statTitle="Total Area"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{areaStatistics?.total}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{areaStatistics?.pending}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{areaStatistics?.active}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Inactive"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{areaStatistics?.inactive}</h3>}
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

export default AreasList
