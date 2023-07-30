import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button } from "reactstrap"
import { Link } from 'react-router-dom'
import Breadcrumbs from "@components/breadcrumbs"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { MapPin, User, UserCheck, UserPlus, UserX } from "react-feather"
import ListTable from "./partials/list-table"
import { getApi, AREAS_STATISTICS } from "@src/constants/apiUrls"
import useJwt from '@src/auth/jwt/useJwt'

function RouteList() {

  return (
    <Fragment>

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

export default RouteList
