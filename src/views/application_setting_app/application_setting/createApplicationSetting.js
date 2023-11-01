import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'

import useJwt from '@src/auth/jwt/useJwt'
import { getApi, APPLICATION_SETTING } from '@src/constants/apiUrls'
import SwalAlert from '@src/components/SwalAlert'

import HostEmailSetting from './hostEmail'
import PusherSetting from './pusher'
import GoogleKey from './googleKey'
import RiderAutoAssign from './riderAutoAssing'
import ApplicationLogo from './applicationLogo'

import { handleApplicationData } from '@src/redux/authentication'
import { useDispatch } from 'react-redux'




const CreateApplicationSetting = () => {
  const dispatch = useDispatch()
  const [applicationID, setApplicationID] = useState('')
  const [emailHost, setEmailHost] = useState('')
  const [emailHostUser, setEmailHostUser] = useState('')
  const [emailHostPassword, setEmailHostPassword] = useState('')
  const [emailPort, SetEmailPort] = useState('')
  
  const [appID, setAppID] = useState('')
  const [key, setKey] = useState('')
  const [secret, setSecret] = useState('')
  const [cluster, setCluster] = useState('')
  const [ssl, setSSL] = useState(false)

  const [googleKey, setGoogleKey] = useState('')

  const [pickupAutoAssingToRider, SetPickupAutoAssingToRider] = useState(false)
  const [deliveryAutoAssingToRider, SetDeliveryAutoAssingToRider] = useState(false)

  const [applicationLogo, setApplicationLogo] = useState([])

  const onSubmit = () => {

    let formData = new FormData()
    formData.append('id', applicationID)
    
    formData.append('email_host', emailHost)
    formData.append('email_host_user', emailHostUser)
    formData.append('email_host_password', emailHostPassword)
    formData.append('email_port', emailPort)

    formData.append('app_id', appID)
    formData.append('key', key)
    formData.append('secret', secret)
    formData.append('cluster', cluster)
    formData.append('ssl', ssl)

    formData.append('google_key', googleKey)

    formData.append('pickup_auto_assing_to_rider', pickupAutoAssingToRider)
    formData.append('delivery_auto_assing_to_rider', deliveryAutoAssingToRider)

    // formData.append("application_logo", applicationLogo[0].originFileObj)
    formData.append("application_logo", applicationLogo)

    return useJwt
      .axiosPost(getApi(APPLICATION_SETTING), formData)
      .then((res) => {
        fetchApplicationData()
        SwalAlert("Application Create Successfully")
      })
      .catch(err => console.log(err))
  }

  const propsData = {
    setEmailHost: setEmailHost,
    emailHost: emailHost,
    setEmailHostUser: setEmailHostUser,
    emailHostUser: emailHostUser,
    setEmailHostPassword: setEmailHostPassword,
    emailHostPassword: emailHostPassword,
    SetEmailPort: SetEmailPort,
    emailPort: emailPort,

    setAppID: setAppID,
    appID: appID,
    setKey: setKey,
    key: key,
    setSecret: setSecret,
    secret: secret,
    setCluster: setCluster,
    cluster: cluster,
    setSSL: setSSL,
    ssl: ssl,

    setGoogleKey: setGoogleKey,
    googleKey: googleKey,

    SetPickupAutoAssingToRider: SetPickupAutoAssingToRider,
    pickupAutoAssingToRider: pickupAutoAssingToRider,
    SetDeliveryAutoAssingToRider: SetDeliveryAutoAssingToRider,
    deliveryAutoAssingToRider: deliveryAutoAssingToRider,

    setApplicationLogo: setApplicationLogo,
    applicationLogo: applicationLogo,

    onSubmit: onSubmit
  }


  const fetchApplicationData = () => {
    return useJwt
      .axiosGet(getApi(APPLICATION_SETTING))
      .then((res) => {
        dispatch(handleApplicationData(res?.data[0]))
      })
      .catch(err => console.log(err))
  }

 

  // console.log(' applicationLogo[0].originFileObj', applicationLogo[0]?.originFileObj)

  const fetchApplicationSettingData = () => {

    return useJwt
      .axiosGet(getApi(APPLICATION_SETTING))
      .then((res) => {
        // setGoogleKey(Response)
        setApplicationID(res?.data[0]?.id)

        setEmailHost(res?.data[0]?.email_host)
        setEmailHostUser(res?.data[0]?.email_host_user)
        setEmailHostPassword(res?.data[0]?.email_host_password)
        SetEmailPort(res?.data[0]?.email_port)

        setAppID(res?.data[0]?.app_id)
        setKey(res?.data[0]?.key)
        setSecret(res?.data[0]?.secret)
        setCluster(res?.data[0]?.cluster)
        setSSL(res?.data[0]?.ssl)

        setGoogleKey(res?.data[0]?.google_key)

        SetPickupAutoAssingToRider(res?.data[0]?.pickup_auto_assing_to_rider)
        SetDeliveryAutoAssingToRider(res?.data[0]?.delivery_auto_assing_to_rider)
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
              children: <HostEmailSetting propsData={propsData} />,
            },
            {
              label: `Pusher`,
              key: 'pusher',
              children: <PusherSetting propsData={propsData} />,
            },
            {
              label: `Google key`,
              key: 'google-key',
              children: <GoogleKey propsData={propsData} />,
            },
            {
              label: `Rider Auto Assign`,
              key: 'rider-auto-assign',
              children: <RiderAutoAssign propsData={propsData} />,
            },

            {
              label: `Company Logo`,
              key: 'company-logo',
              children: <ApplicationLogo propsData={propsData} />,
            },
            
          ]
        }
      />
    </>
  )
}
export default CreateApplicationSetting
