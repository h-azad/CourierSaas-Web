// ** React Imports
import { Fragment, useEffect, useState } from "react"

// ** Third Party Components
import classnames from "classnames"
import PerfectScrollbar from "react-perfect-scrollbar"
import { Bell } from "react-feather"
import OrderDetailsDrawer from "@src/components/order/OrderDetailsDrawer"
// ** Reactstrap Imports
import {
  Button,
  Badge,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap"

import { getUserData } from "@utils"
import {
  getApi,
  RIDER_NOTIFICATION_LIST,
} from "@src/constants/apiUrls"
import useJwt from "@src/auth/jwt/useJwt"

import Pusher from 'pusher-js'

const NotificationDropdown = () => {

  const [notificationData, setNotificationData] = useState([])
  const [orderid, setOrderId] = useState(0)

  const [open, setOpen] = useState(false)
  const showOrderDetailsDrawer = () => {
    setOpen(true)

  }
  const onCloseOrderDetailsDrawer = () => {
    setOpen(false)
  }

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {

    function removeElementById(array, id) {
      const index = array.findIndex(item => item.id === id);
      if (index !== -1) {
        array.splice(index, 1);
      }
    }

    const fetchNotificationData = () => {
      return useJwt
        .axiosGet(getApi(RIDER_NOTIFICATION_LIST))
        .then((res) => {
          setNotificationData(res?.data)
        })
        .catch((err) => console.log(err))
    }

    const fetchDetailsNotification = (id) => {
      return useJwt
        .axiosPost(getApi(RIDER_NOTIFICATION_LIST) + '/' + id + '/')
        .then((res) => {
          removeElementById(notificationData, id);
          setNotificationData(notificationData)
          SwalAlert("Read Notification")
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
      fetchNotificationData()
    }, [])


    useEffect(() => {
      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;

      var pusher = new Pusher('549915084078b9784364', {
        cluster: 'ap2',
        authEndpoint: localStorage.getItem('domainName') + '/pusher/auth',
        encrypted: true, // Use SSL
      });

      const chName = "private-" + getUserData()?.id;

      var channel = pusher.subscribe(chName);
      channel.bind('new-notification', function (data) {

        const array1 = [data]
        const array2 = notificationData
        const array3 = array1.concat(array2)
        setNotificationData(array3)

      });

      return () => {
        pusher.unsubscribe(chName);
      };
    }, [notificationData])

    return (
      <PerfectScrollbar
        component="li"
        className="media-list scrollable-container"
        options={{
          wheelPropagation: false,
        }}
      >
        {notificationData.slice(0, 4).map((item) => {
          return (
            <div
              className={classnames('list-item d-flex', {
                'align-items-start': !item?.order?.parcel_id,
                'align-items-center': item?.order?.parcel_id
              })}
            >
              <Fragment>
                <h5 style={{ color: "red" }}>{item.message} {' '}</h5>
                <p onClick={() => { setOrderId(item?.order?.id), showOrderDetailsDrawer(), fetchDetailsNotification(item?.id) }}>{item?.order?.parcel_id}</p>
              </Fragment>
            </div>
            // </a>
          )
        })}
      </PerfectScrollbar>
    );
  };
  /*eslint-enable */

  return (
    <>
      <UncontrolledDropdown
        tag="li"
        className="dropdown-notification nav-item me-25"
      >
        <DropdownToggle
          tag="a"
          className="nav-link"
          href="/"
          onClick={(e) => e.preventDefault()}
        >
          <Bell size={21} />
          <Badge pill color="danger" className="badge-up">
            {notificationData.length}
          </Badge>
        </DropdownToggle>
        <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0">
          <li className="dropdown-menu-header">
            <DropdownItem className="d-flex" tag="div" header>
              <h4 className="notification-title mb-0 me-auto">Notifications</h4>
              <Badge tag="div" color="light-primary" pill>
                6 New
              </Badge>
            </DropdownItem>
          </li>
          {renderNotificationItems()}
          <li className="dropdown-menu-footer">
            <Button color="primary" block>
              Read all notifications
            </Button>
          </li>
        </DropdownMenu>
      </UncontrolledDropdown>

      <OrderDetailsDrawer open={open} orderID={orderid} showOrderDetailsDrawer={showOrderDetailsDrawer} onCloseOrderDetailsDrawer={onCloseOrderDetailsDrawer} />
    </>


  )
}

export default NotificationDropdown
