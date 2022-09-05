import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button } from "reactstrap"
import { Link } from 'react-router-dom'
import Breadcrumbs from "@components/breadcrumbs"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { Cpu, Search, User, UserCheck, UserPlus, UserX } from "react-feather"
import useJwt from '@src/auth/jwt/useJwt'
import ListTable from "./partials/list-table"
import { getApi, MARCHANT_LIST } from "../../constants/apiUrls"

function MerchantList() {

  return (
    <Fragment>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Users"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">21,459</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Paid Users"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active Users"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending Users"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">237</h3>}
          />
        </Col>
      </Row>

      <Row>
        <Col sm="12">
          <Card title="Bordered">
            <CardBody>
              <CardText>
                <Link to={'/merchants/add'}><Button.Ripple color='primary'>Add Merchant</Button.Ripple></Link>
              </CardText>
              <input placeholder="Search Marchant" name="user_name" type="text" class="form-control" value=""></input>
              <Button.Ripple className='btn-icon' outline color='primary'>
                  <Search size={16} />
              </Button.Ripple>
            </CardBody>
            <ListTable />
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default MerchantList
