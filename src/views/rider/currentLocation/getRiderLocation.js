// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardBody,
//   Input,
//   Form,
//   Button,
//   Label,
// } from "reactstrap"
// import { useNavigate } from "react-router-dom"
// import Select from "react-select"
// import { useForm, Controller } from 'react-hook-form'
// import classnames from 'classnames'
// import useJwt from '@src/auth/jwt/useJwt'
// // import { getApi, RIDER_ADD, PAYMENT_METHOD_FORM_LIST, CITY_FORM_LIST, AREAS_LIST } from '@src/constants/apiUrls'
// // import SwalAlert from "../../components/SwalAlert"
// import { getApi, USER_LOCATION } from "@src/constants/apiUrls"
// import { useEffect, useState } from "react"
// // import { identity } from "../../constants/data/identity"
// // import { AREAS_BY_CITY } from "../../constants/apiUrls"
// import React, { useRef } from "react"

// import { GoogleMap, Marker } from '@react-google-maps/api'
// import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

// import axios from "axios"

// const GetCurrentLocationRider = () => {




//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle tag="h4">Rider Current Locations</CardTitle>
//       </CardHeader>

//     </Card>
//   )
// }
// export default GetCurrentLocationRider





import React, { useState } from "react"
import GoogleMapReact from "google-map-react"
import { Circle, MapPin } from "react-feather"

import { getApi, USER_LOCATION } from "@src/constants/apiUrls"

const GetCurrentLocationRider = () => {
  const [selectLocationData, setSelectLocationData] = useState
  const center = {
    lat: 23.756107, // Latitude of your map center
    lng: 90.387196, // Longitude of your map center
  }

  const zoom = 10 // Zoom level

  // const markers = [
  //   { lat: 23.822350, lng: 90.365417, text: "Mirpur" },
  //   { lat: 23.746466, lng: 90.376015, text: "Dhanmondi" },
  //   // Add more markers as needed
  // ]




  const fetchLocationData = () => {
    return useJwt
      .axiosGet(getApi(USER_LOCATION))
      .then((res) => {
        let locationData = []
        
        res.data.map(data => {
          locationData.push({ value: data.id, label: data.city_name })
        })
        setSelectLocationData(locationData)

      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchLocationData()
  }, [])

  return (
    <>
      <div style={{ height: "500px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA_bi6febAzWK5EPN8cWv986ATCRxhK-ac" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {selectLocationData.map((marker, index) => (
            <Marker
              key={index}
              lat={marker.lat}
              lng={marker.lng}
              text={marker.text}
            />
          ))}
        </GoogleMapReact>
      </div>

    </>
  )
}

const Marker = ({ text }) => (
  <div className="map-marker">
    <MapPin style={{ color: 'red', fill: 'black' }} />
    {text}
  </div>
)

export default GetCurrentLocationRider

