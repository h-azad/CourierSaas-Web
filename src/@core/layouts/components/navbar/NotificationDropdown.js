// ** React Imports
import { Fragment, useEffect, useState } from "react"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Third Party Components
import classnames from "classnames"
import PerfectScrollbar from "react-perfect-scrollbar"
import { Bell, X, Check, AlertTriangle } from "react-feather"

// ** Reactstrap Imports
import {
  Button,
  Badge,
  Input,
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
  let totalNotification = notificationData.length

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {

    const fetchNotificationData = () => {
      return useJwt
        .axiosGet(getApi(RIDER_NOTIFICATION_LIST))
        .then((res) => {
          setNotificationData(res?.data)
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

    console.log('notificationData =>>>>>>>>>>>>', notificationData)


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
                <p style={{ color: "red" }}>{item.message} {' '}</p>
                {item?.order?.parcel_id}
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
  )
}

export default NotificationDropdown
