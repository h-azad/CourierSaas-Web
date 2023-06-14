import { Fragment } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import CreateOrderInfoList from './CreateOrderInfoList'
const UserTabs = ({ active, toggleTab, userInfo }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        {/* <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>Account</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Security</span>
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <CreateOrderInfoList userInfo={userInfo} />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
