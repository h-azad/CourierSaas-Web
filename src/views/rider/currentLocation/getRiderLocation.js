
import React, { useState, useEffect } from "react"
import GoogleMapReact from "google-map-react"
import { MapPin } from "react-feather"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, USER_LOCATION } from "@src/constants/apiUrls"
import { Button, List, Avatar } from 'antd'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap"

const styles = {
  markerStyle: {
    color: 'red',
    fill: 'black'
  },
  activeMarker: {
    color: '#fff',
    fill: 'black'
  },
  userList: {
    height: '100%',
    overflow: 'auto',
    padding: '0 16px',
    border: '1px solid rgba(140, 140, 140, 0.35)',
  }
}

const GetCurrentLocationRider = () => {
  const [selectLocationData, setSelectLocationData] = useState([])
  const [activeMarker, setActiveMarker] = useState()

  const fetchLocationData = () => {
    return useJwt
      .axiosGet(getApi(USER_LOCATION))
      .then((res) => {
        setSelectLocationData(res?.data)
      })
      .catch(err => console.log(err))
  }

  const handleActiveMarker = (id) => {
    setActiveMarker(id)
    return false
  }

  const updateActive = (id) => {
    setActiveMarker(id)
  }

  useEffect(() => {
    fetchLocationData()
  }, [])


  return (

    <Card>
      <CardHeader>
        <CardTitle tag="h4">Riders Location</CardTitle>
      </CardHeader>
      <CardBody>
        <div class="row">
          <div class="col-lg-3">
            <div className='mb-1'>
              <div style={styles.userList}>
                <List
                  itemLayout="horizontal"
                  dataSource={selectLocationData}
                  renderItem={(item, index) => (
                    <>
                      {item?.last_latitude ? (
                        <List.Item key={index} id={item.id}>
                          <List.Item.Meta
                            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                            title={<Button onClick={e => handleActiveMarker(item.id)}>{item.name}</Button>}
                            description="Current Address: "
                          />
                        </List.Item>
                      ) : (<></>)}
                    </>
                  )}
                />
              </div>
            </div>
          </div>
          <div class="col-lg-9">
            <div className='mb-1'>
              <MapComponent data={selectLocationData} activeMarker={activeMarker} updateActive={updateActive} />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

const MapComponent = ({ data, activeMarker, updateActive }) => {
  useEffect(() => {
    console.log(activeMarker)
  }, [activeMarker])

  const center = {
    lat: 23.6850, // Latitude of your map center
    lng: 90.3563, // Longitude of your map center
  }

  const zoom = 12 // Zoom level

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyA_bi6febAzWK5EPN8cWv986ATCRxhK-ac" }}
        defaultCenter={center}
        defaultZoom={7}
      >
        {data.map((marker, index) => (
          <Marker
            key={index}
            lat={marker?.last_latitude}
            lng={marker?.last_longitude}
            data={marker}
            activeStatus={activeMarker == marker?.id ? true : false}
            updateActive={updateActive}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

const Marker = ({ activeStatus, data, updateActive }) => {
  const [status, setStatus] = useState(true)

  useState(() => {
    setStatus(!activeStatus)
  }, [activeStatus])

  const handleClick = (id) => {
    // console.log(e)
    updateActive(id)
  }

  return (
    <div className="map-marker" onClick={e => updateActive(data.id)}>
      {activeStatus && (
        <div className="map-location-info">
          <h3>{data?.name}</h3>
          <p>{data?.location_name}</p>
        </div>
      )}
      <MapPin style={activeStatus ? styles.activeMarker : styles.markerStyle} />
    </div>
  )
}

export default GetCurrentLocationRider

