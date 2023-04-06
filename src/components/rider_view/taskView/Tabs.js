import { Fragment } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import TaskInfoList from './TaskInfoList'
const UserTabs = ({ active, toggleTab, userInfo }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <TaskInfoList userInfo={userInfo} />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
