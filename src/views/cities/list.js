import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button } from "reactstrap"
import { Link } from 'react-router-dom'
import Breadcrumbs from "@components/breadcrumbs"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { Map } from "react-feather"
import ListTable from "./partials/list-table"

import { getApi, CITY_STATISTICS } from "@src/constants/apiUrls"
import useJwt from '@src/auth/jwt/useJwt'

function CitiesList() {

  const [cityStatistics, setCityStatistics] = useState({
    total: 0,
    pending: 0,
    active: 0,
    inactive: 0,
  })

  const fetchCityStatisticsData = () => {
    return useJwt
      .axiosGet(getApi(CITY_STATISTICS))
      .then((res) => {
        setCityStatistics(
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
    fetchCityStatisticsData()
  }, [])

  return (
    <Fragment>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            statTitle="Total City"
            icon={<Map size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{cityStatistics?.total}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending"
            icon={<Map size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{cityStatistics?.pending}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active"
            icon={<Map size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{cityStatistics?.active}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Inactive"
            icon={<Map size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{cityStatistics?.inactive}</h3>}
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

export default CitiesList
