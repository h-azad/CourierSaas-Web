import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'

import useJwt from "@src/auth/jwt/useJwt"

import HostEmailSetting from './hostEmail'
import PusherSetting from './pusher'
import GoogleKey from './googleKey'
import { getApi, APPLICATION_SETTING } from '@src/constants/apiUrls'




const CreateApplicationSetting = () => {

  const [emailHost, setEmailHost] = useState()
  const [emailHostUser, setEmailHostUser] = useState()
  const [emailHostPassword, setEmailHostPassword] = useState()
  const [emailPort, SetEmailPort] = useState()

  const [appID, SetAppID] = useState()
  const [key, SetKey] = useState()
  const [secret, setSecret] = useState()
  const [cluster, SetCluster] = useState()
  const [ssl, SetSSL] = useState()

  const [googleKey, setGoogleKey] = useState()

  const [pickupAutoAssingToRider, SetPickupAutoAssingToRider] = useState()
  const [deliveryAutoAssingToRider, SetDeliveryAutoAssingToRider] = useState()

  const emailHostProps = {
    setEmailHost: setEmailHost,
    emailHost: emailHost,
    setEmailHostUser: setEmailHostUser,
    emailHostUser: emailHostUser,
    setEmailHostPassword: setEmailHostPassword,
    emailHostPassword: emailHostPassword,
    SetEmailPort: SetEmailPort,
    emailPort: emailPort,
  }

  const pusherProps = {
    SetAppID: SetAppID,
    appID: appID,
    SetKey: SetKey,
    key: key,
    setSecret: setSecret,
    secret: secret,
    SetCluster: SetCluster,
    cluster: cluster,
    SetSSL: SetSSL,
    ssl: ssl,
  }

  const googleKeyProps = {
    setGoogleKey: setGoogleKey,
    googleKey: googleKey,
  }

  const autoAssignProps = {
    SetPickupAutoAssingToRider: SetPickupAutoAssingToRider,
    pickupAutoAssingToRider: pickupAutoAssingToRider,
    SetDeliveryAutoAssingToRider: SetDeliveryAutoAssingToRider,
    deliveryAutoAssingToRider: deliveryAutoAssingToRider,
  }

  const fetchApplicationSettingData = () => {

    return useJwt
      .axiosGet(getApi(APPLICATION_SETTING))
      .then((res) => {
        // setGoogleKey(Response)
        setEmailHost(res?.data[0]?.email_host)
        setEmailHostUser(res?.data[0]?.email_host_user)
        setEmailHostPassword(res?.data[0]?.email_host_password)
        SetEmailPort(res?.data[0]?.email_port)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchApplicationSettingData()
  }, [])

  return (
    <>
      <Tabs
        tabPosition='left'
        items={
          [
            {
              label: `Host Email`,
              key: 'host-email',
              children: <HostEmailSetting emailHostProps={emailHostProps} />,
            },
            {
              label: `Pusher`,
              key: 'pusher',
              children: <PusherSetting pusherProps={pusherProps} />,
            },
            {
              label: `Google key`,
              key: 'google-key',
              children: <GoogleKey googleKeyProps={googleKeyProps} />,
            },
          ]
        }
      />
    </>
  )
}
export default CreateApplicationSetting
