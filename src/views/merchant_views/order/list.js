import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody} from "reactstrap"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { Home, Box, Truck, CornerDownLeft } from 'react-feather'
import useJwt from '@src/auth/jwt/useJwt'
import OrdersList from "../../../components/merchant_views/order/OrdersList"
import OrderView from "../../../components/merchant_views/order/OrderView"
import { getApi, MARCHANT_ORDER_LIST, ORDER_STATISTICS, MARCHANT_SEARCH_CREATE_ORDER_FILTER } from "../../../constants/apiUrls"
import * as qs from 'qs'

function MerchantOrdersList() {

  const [orders, setOrders] = useState([])
  const [orderCount, setOrderCount] = useState(0)
	const [filterQuery, setFilterQuery] = useState({})

  const [orderStatistics, setOrderStatistics] = useState({
    pending_orders: 0,
    in_warehouse_orders: 0,
    shipped_orders: 0,
    return_orders: 0
  })



  const fetchOrderStatisticsData = () => {
    return useJwt
      .axiosGet(getApi(ORDER_STATISTICS))
      .then((res) => {
        setOrderStatistics(
          {
            pending_orders: res.data.pending_orders,
            in_warehouse_orders: res.data.in_warehouse_orders,
            shipped_orders: res.data.shipped_orders,
            return_orders: res.data.return_orders,
          })
      })
      .catch((err) => console.log(err))
  }


  useEffect(() => {
    fetchOrderStatisticsData()
  }, [])


  const handleSearchQuery = searchTerm => {
		return useJwt
			.axiosGet(getApi(MARCHANT_SEARCH_CREATE_ORDER_FILTER) + '?' + searchTerm)
			.then((res) => {
				if (res.data?.results) {
					setOrders(res?.data?.results)
					setOrderCount(res?.data?.count)
				}
			})
			.catch((err) => console.log(err))
	}

	function updateFilterQUery(term, value) {
		let filters = { ...filterQuery }
		if (term != 'page') {
			filters['page'] = 1
		}

		if (value) {
			filters[term] = value
		} else {
			filters.hasOwnProperty(term) && delete filters[term]
		}
		setFilterQuery(filters)
	}

	useEffect(() => {
		handleSearchQuery(qs.stringify(filterQuery))
	}, [filterQuery])

	const paginationUpdate = (page) => {
		updateFilterQUery("page", page)
	}

  const currentOrderData={
    paginationUpdate: paginationUpdate,
    handleSearchQuery: handleSearchQuery,
    orderCount: orderCount,
    orders: orders,
  }


  return (
    <Fragment>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Pending"
            icon={<Box size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{orderStatistics?.pending_orders}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="WireHouse"
            icon={<Home size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{orderStatistics?.in_warehouse_orders}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Shipped"
            icon={<Truck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{orderStatistics?.shipped_orders}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Return"
            icon={<CornerDownLeft size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{orderStatistics?.return_orders}</h3>}
          />
        </Col>
      </Row>

      <Row>
        <Col sm="4">
          <Card title="Bordered">
            <CardBody>
              <OrdersList setFilterQuery={setFilterQuery} handleSearchQuery={handleSearchQuery} updateFilterQUery={updateFilterQUery} />
              {/* <TaskFilter setFilterQuery={setFilterQuery} handleSearchQuery={handleSearchQuery} updateFilterQUery={updateFilterQUery} />  */}
              {/* <ListTable /> */}
            </CardBody>
          </Card>
        </Col>
        <Col sm="8">
          <Card title="Bordered">
            <CardBody>
              {/* <ListTable /> */}
              <OrderView currentOrderData={currentOrderData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default MerchantOrdersList
