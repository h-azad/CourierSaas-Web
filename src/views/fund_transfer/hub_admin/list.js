import React, { Fragment } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody } from "reactstrap"

import ListTable from "./partials/list-table"

function FundTransferListFoHubAdmin() {

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

export default FundTransferListFoHubAdmin
