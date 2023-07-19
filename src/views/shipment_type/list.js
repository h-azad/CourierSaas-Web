import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button } from "reactstrap"
import { Link } from 'react-router-dom'
import Breadcrumbs from "@components/breadcrumbs"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { Truck, User, UserCheck, UserPlus, UserX } from "react-feather"
import ListTable from "./partials/list-table"
import { getApi, SHIPMENT_TYPE_STATISTICS } from "@src/constants/apiUrls"
import useJwt from '@src/auth/jwt/useJwt'

function ShipmentTypeList() {

  const [shipmentTypeStatistics, setShipmentTypeStatistics] = useState({
    total: 0,
    pending: 0,
    active: 0,
    inactive: 0,
  })

  const fetchShipmentTypeStatisticsData = () => {
    return useJwt
      .axiosGet(getApi(SHIPMENT_TYPE_STATISTICS))
      .then((res) => {
        setShipmentTypeStatistics(
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
    fetchShipmentTypeStatisticsData()
  }, [])

  return (
    <Fragment>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            statTitle="Total Shipment Type"
            icon={<Truck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{shipmentTypeStatistics?.total}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending"
            icon={<Truck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{shipmentTypeStatistics?.pending}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active"
            icon={<Truck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{shipmentTypeStatistics?.active}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Inactive"
            icon={<Truck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{shipmentTypeStatistics?.inactive}</h3>}
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

export default ShipmentTypeList
