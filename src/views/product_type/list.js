import React, { Fragment, useEffect, useState } from "react"
import { Row, Col, Card, CardBody, CardText, Button } from "reactstrap"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { ShoppingCart, User, UserCheck, UserPlus, UserX } from "react-feather"
import ListTable from "./partials/list-table"
import { getApi, PRODUCT_TYPE_STATISTICS } from "@src/constants/apiUrls"
import useJwt from '@src/auth/jwt/useJwt'

function ProductTypeList() {

  const [productTypeStatistics, setProductTypeStatistics] = useState({
    total: 0,
    // pending: 0,
    active: 0,
    inactive: 0,
  })

  const fetchShipmentTypeStatisticsData = () => {
    return useJwt
      .axiosGet(getApi(PRODUCT_TYPE_STATISTICS))
      .then((res) => {
        setProductTypeStatistics(
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
    fetchShipmentTypeStatisticsData()
  }, [])

  return (
    <Fragment>
      <Row>
        <Col lg="4" sm="6">
          <StatsHorizontal
            statTitle="Total Product Type"
            icon={<ShoppingCart size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{productTypeStatistics?.total}</h3>}
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending"
            icon={<ShoppingCart size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{productTypeStatistics?.pending}</h3>}
          />
        </Col>
        {/* <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active"
            icon={<ShoppingCart size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{productTypeStatistics?.active}</h3>}
          />
        </Col> */}
        <Col lg="4" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Inactive"
            icon={<ShoppingCart size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{productTypeStatistics?.inactive}</h3>}
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

export default ProductTypeList
