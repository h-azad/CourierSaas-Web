import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'

import useJwt from '@src/auth/jwt/useJwt'
import { getApi, APPLICATION_SETTING } from '@src/constants/apiUrls'
import SwalAlert from '@src/components/SwalAlert'

import ApplicationLogo from './applicationLogo'

import { handleApplicationData } from '@src/redux/authentication'
import { useDispatch } from 'react-redux'
import CompanySetting from './CompanySetting.js'




const CreateApplicationSetting = () => {
  const dispatch = useDispatch()
  const [applicationID, setApplicationID] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [googleMap, setGoogleMap] = useState('')
  const [address, setAddress] = useState('')
  // const [googleMap, setGoogleMap] = useState('')
  
  const [applicationLogo, setApplicationLogo] = useState('')
  const [currentApplicationLogo, setCurrentApplicationLogo] = useState()

  const onSubmit = () => {

    console.log('name', name)

    let formData = new FormData()
    
    formData.append('id', applicationID)
    
    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('google_map', googleMap)
    formData.append('address', address)

    formData.append("application_logo", applicationLogo)

    console.log('form data', formData)

    return useJwt
      .axiosPost(getApi(APPLICATION_SETTING), formData)
      .then((res) => {
        fetchApplicationData()
        SwalAlert("Application Create Successfully")
      })
      .catch(err => console.log(err))
  }

  const propsData = {
    setName: setName,
    name: name,
    setPhone: setPhone,
    phone: phone,
    setEmail: setEmail,
    email: email,
    setGoogleMap: setGoogleMap,
    googleMap: googleMap,
    setAddress: setAddress,
    address: address,

    setApplicationLogo: setApplicationLogo,
    applicationLogo: applicationLogo,

    currentApplicationLogo: currentApplicationLogo,

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

 
  const fetchApplicationSettingData = () => {

    return useJwt
      .axiosGet(getApi(APPLICATION_SETTING))
      .then((res) => {
        // setGoogleKey(Response)
        setApplicationID(res?.data[0]?.id)

        setName(res?.data[0]?.name)
        setPhone(res?.data[0]?.phone)
        setEmail(res?.data[0]?.email)
        setGoogleMap(res?.data[0]?.google_map)
        setAddress(res?.data[0]?.address)

        setCurrentApplicationLogo(res?.data[0]?.application_logo)
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
              label: `Company Setting`,
              key: 'company-setting',
              children: <CompanySetting propsData={propsData} />,
            },

            {
              label: `Company Logo`,
              key: 'company-logo',
              children: <ApplicationLogo propsData={propsData} />,
            },

            // {
            //   label: `Company Setting`,
            //   key: 'company-setting',
            //   children: <EditCompanySetting />,
            // },

          ]
        }
      />
    </>
  )
}
export default CreateApplicationSetting
