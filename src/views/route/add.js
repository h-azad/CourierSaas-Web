// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap"
import { useNavigate } from "react-router-dom"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, ROUTE } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import { Steps } from 'antd'
import RouteInformation from "./routeInformation"
import Finished from "./finished"
import RouteArea from "./routeArea"



const AddRoute = () => {
  const [current, setCurrent] = useState(0)
  const [startTime, setStartTime] = useState()
  console.log("startTime", startTime)
  const [title, setTitle] = useState()
  const [startLocation, setStartLocation] = useState()
  const [coordinate, setCoordinate] = useState()

  const [selectCity, setSelectCity] = useState([])
  const [selectArea, setSelectArea] = useState([])

  const [fromValue, setFromValue] = useState({
    startTime:'',

  })

  const [city, setCity] = useState()
  const [area, setArea] = useState()

  console.log('city', city)
  console.log('area', area)
  
  const navigate = useNavigate()

  const [routeFinishing, setRouteFinishing] = useState()

  const next = () => {
    setCurrent(current + 1)
  }
  const prev = () => {
    setCurrent(current - 1)
  }



  const SubmitDataHandler = () => {
    const formData = new FormData()
    formData.append('start_time', startTime)
    formData.append('title', title)
    formData.append('start_location', startLocation)
    formData.append('finishing', routeFinishing)
    formData.append('coordinate', coordinate)
    formData.append('city', city)
    formData.append('area', JSON.stringify(area))


    return useJwt
      // .axiosPost(getApi(ROUTE), formData, headers)
      .axiosPost(getApi(ROUTE), formData)
      .then((res) => {
        navigate("/route")
        SwalAlert("Route Added Successfully")
      })
      .catch(err => console.log(err))
  }


  const routeInformationData = {
    setCurrent: setCurrent,
    current: current,
    // stepsData: stepsData,
    setCoordinate: setCoordinate,
    coordinate: coordinate,
    setStartTime: setStartTime,
    startTime: startTime,
    setTitle: setTitle,
    title: title,
    setStartLocation: setStartLocation,
    startLocation: startLocation,
    next: next,
  }


  const routeAreaData = {
    setCity: setCity,
    setSelectCity: setSelectCity,
    selectCity: selectCity,

    setSelectArea: setSelectArea,
    selectArea: selectArea,
    city: city,
    setArea: setArea,
    area: area,
    next: next,
    prev: prev,
  }
  
  const finishedData = {
    setRouteFinishing: setRouteFinishing,
    SubmitDataHandler: SubmitDataHandler,

    next: next,
    prev: prev,
  }


  

  // const headers = {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // }
  




  const steps = [
    {
      title: 'Route Information',
      content: <RouteInformation routeInformationData={routeInformationData} />,
    },
    {
      title: 'Route Areas',
      content: <RouteArea routeAreaData={routeAreaData} />,
    },
    {
      title: 'Finishing',
      content: <Finished finishedData={finishedData} />,
    },
  ]


  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))

  useEffect(() => {
  }, [])




  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Route</CardTitle>
      </CardHeader>
      <CardBody>
        <Steps current={current} items={items} />
        <div >{steps[current].content}</div>
      </CardBody>
    </Card>
  )
}
export default AddRoute
