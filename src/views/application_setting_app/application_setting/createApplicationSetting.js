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
  const [weekends, setWeekends] = useState('')
  const [officeStartTime, setOfficeStartTime] = useState()
  const [officeEndTime, setOfficeEndTime] = useState()
  const [googleMap, setGoogleMap] = useState('')
  const [address, setAddress] = useState('')

  const [applicationLogo, setApplicationLogo] = useState('')
  const [currentApplicationLogo, setCurrentApplicationLogo] = useState()




  const onSubmit = () => {

    let formData = new FormData()

    formData.append('id', applicationID)

    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('google_map', googleMap)
    formData.append('address', address)
    formData.append('weekends', JSON.stringify(weekends))

    formData.append("office_start_time", officeStartTime)
    formData.append("office_end_time", officeEndTime)

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
    setName: setName,
    name: name,
    setPhone: setPhone,
    phone: phone,
    setEmail: setEmail,
    email: email,
    setWeekends: setWeekends,
    weekends: weekends,

    setOfficeStartTime: setOfficeStartTime,
    officeStartTime: officeStartTime,

    setOfficeEndTime: setOfficeEndTime,
    officeEndTime: officeEndTime,
    

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

        setApplicationID(res?.data[0]?.id)

        setName(res?.data[0]?.name)
        setPhone(res?.data[0]?.phone)
        setEmail(res?.data[0]?.email)
        setGoogleMap(res?.data[0]?.google_map)
        setAddress(res?.data[0]?.address)
        setWeekends(res?.data[0]?.weekends)
        setCurrentApplicationLogo(res?.data[0]?.application_logo)
        setOfficeStartTime(res?.data[0]?.office_start_time)
        setOfficeEndTime(res?.data[0]?.office_end_time)
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
          ]
        }
      />
    </>
  )
}
export default CreateApplicationSetting
