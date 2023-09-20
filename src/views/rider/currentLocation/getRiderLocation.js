
import React, { useState, useEffect } from "react"
import GoogleMapReact from "google-map-react"
import { MapPin } from "react-feather"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, USER_LOCATION } from "@src/constants/apiUrls"
import { Popconfirm } from 'antd'

const GetCurrentLocationRider = () => {
  const [selectLocationData, setSelectLocationData] = useState([])
  const center = {
    lat: 23.756107, // Latitude of your map center
    lng: 90.387196, // Longitude of your map center
  }

  const zoom = 10 // Zoom level


  const fetchLocationData = () => {
    return useJwt
      .axiosGet(getApi(USER_LOCATION))
      .then((res) => {
        setSelectLocationData(res?.data)
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
              lat={marker.last_latitude}
              lng={marker.last_longitude}
              text={{ location: marker.location_name, name: marker.name }}
            />
          ))}
        </GoogleMapReact>
      </div>

    </>
  )
}

const Marker = ({ text }) => (
  <div className="map-marker">
    <Popconfirm
      title={text.name}
      description={text.location}
    // onConfirm={confirm}
    // onCancel={cancel}
    // okText="Yes"
    // cancelText="No"
    >
      <MapPin style={{ color: 'red', fill: 'black' }} />
    </Popconfirm>

  </div>
)

export default GetCurrentLocationRider

