import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button } from "reactstrap"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { Cpu, User, UserCheck, UserPlus, UserX } from "react-feather"
import ListTable from "./partials/list-table"
import { getApi, AGENT_STATISTICS } from "@src/constants/apiUrls"
import useJwt from '@src/auth/jwt/useJwt'

function AgentList() {

  const [agentStatistics, setAgentStatistics] = useState({
    total: 0,
    // pending: 0,
    active: 0,
    inactive: 0,
  })

  const fetchAgentStatisticsData = () => {
    return useJwt
      .axiosGet(getApi(AGENT_STATISTICS))
      .then((res) => {
        setAgentStatistics(
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
    fetchAgentStatisticsData()
  }, [])


  return (
    <Fragment>
      <Row>
        <Col lg="4" sm="6">
          <StatsHorizontal
            statTitle="Total Agent"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{agentStatistics?.total}</h3>}
          />
        </Col>
        {/* <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{agentStatistics?.pending}</h3>}
          />
        </Col> */}
        <Col lg="4" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{agentStatistics?.active}</h3>}
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Inactive"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{agentStatistics?.inactive}</h3>}
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

export default AgentList
