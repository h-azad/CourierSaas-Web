// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { TabContent, TabPane } from 'reactstrap'

// ** User Components
import CreateOrderInfoList from './CreateOrderInfoList'

const OrderDetails = ({ active, orderDetails }) => {
  return (
    <Fragment>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <CreateOrderInfoList orderDetails={orderDetails} />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default OrderDetails
