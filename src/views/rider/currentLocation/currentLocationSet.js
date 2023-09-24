import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import useJwt from '@src/auth/jwt/useJwt'
// import { getApi, RIDER_ADD, PAYMENT_METHOD_FORM_LIST, CITY_FORM_LIST, AREAS_LIST } from '@src/constants/apiUrls'
// import SwalAlert from "../../components/SwalAlert"
import { getApi, USER_LOCATION } from "@src/constants/apiUrls"
import { useEffect, useState } from "react"
// import { identity } from "../../constants/data/identity"
// import { AREAS_BY_CITY } from "../../constants/apiUrls"
import React, { useRef } from "react"

import { GoogleMap, Marker } from '@react-google-maps/api'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

import axios from "axios"

const CurrentLocationSet = () => {

  console.log("Hello Joy")

  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [ipAddress, setIpAddress] = useState("")
  const [deviceInfo, setDeviceInfo] = useState({})
  const [locationName, setLocationName] = useState()
  const [locationInfo, setlocationInfo] = useState()

  

  const updateLocation = (_formData) => {

    return useJwt
      .axiosPost(getApi(USER_LOCATION), _formData)
      .then((res) => {

      })
      .catch(err => console.log(err))
  }

  const getMyLocation = async () => {

    const GOOGLE_API_KEY = "AIzaSyA_bi6febAzWK5EPN8cWv986ATCRxhK-ac"

    if (window.navigator && window.navigator.geolocation) {
      const location = window.navigator.geolocation
      location.getCurrentPosition(async function (position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        if (latitude & longitude){
          setLatitude(latitude)
          setLongitude(longitude)

          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`)
          const data = await response.json()
          if (data.results.length > 0) {
            const locationName = data.results[0].formatted_address
            setLocationName(locationName)

            var formData = new FormData()
            formData.append('last_latitude', latitude)
            formData.append('last_longitude', longitude)
            formData.append('location_name', locationName)
            updateLocation(formData)
          }
        }
        
        
      })
    }
  }


  useEffect(() => {
    getMyLocation()
  }, [latitude, longitude])




  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     return getMyLocation()
  //   }, 10000)
    
  //   return () => clearInterval(timer)
  // }, [])

 

  console.log('latitude', latitude)
  console.log('longitude', longitude)


  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Rider Set location</CardTitle>
      </CardHeader>

    </Card>
  )
}
export default CurrentLocationSet
