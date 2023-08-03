
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap"

import useJwt from '@src/auth/jwt/useJwt'
import { getApi, ROUTE } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"
import { useNavigate, useParams } from "react-router-dom"

import { Steps } from 'antd'
import Form1 from "./edit/form1"
import Form2 from "./edit/form2"
import Form3 from "./edit/form3"


const EditRoute = () => {
  const [routeData, setRouteData] = useState()
  const [current, setCurrent] = useState(0)
  const [startTime, setStarTime] = useState()
  const [title, setTitle] = useState()
  const [startLocation, setStartLocation] = useState()

  const [city, setCity] = useState()
  const [areas, setAreas] = useState([])
  const [routeFinishing, setRouteFinishing] = useState()

  let { id } = useParams()
  const navigate = useNavigate()



  const next = () => {
    setCurrent(current + 1)
  }
  const prev = () => {
    setCurrent(current - 1)
  }

  const formData = new FormData()
  formData.append('start_time', startTime)
  formData.append('title', title)
  formData.append('start_location', startLocation)
  formData.append('city', city)
  formData.append('area', areas)
  formData.append('finishing', routeFinishing)


  const headers = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const SubmitDataHandler = () => {
    return useJwt
      .axiosPut(getApi(ROUTE) + id + "/", formData, headers)
      .then((res) => {
        SwalAlert("Route Edit Successfully")
        navigate("/route")
      })
      .catch(err => console.log(err))
  }

  const steps = [
    {
      title: 'Route Information',
      content: <Form1 routeData={routeData} setStarTime={setStarTime} setTitle={setTitle} setStartLocation={setStartLocation} next={next} />,
    },
    {
      title: 'Route',
      content: <Form2 routeData={routeData} setCity={setCity} setAreas={setAreas} next={next} prev={prev} />,
    },
    {
      title: 'Finishing',
      content: <Form3 routeData={routeData} setRouteFinishing={setRouteFinishing} SubmitDataHandler={SubmitDataHandler} />,
    },
  ]

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))

  useEffect(() => {
    useJwt
      .axiosGet(getApi(ROUTE) + id + "/")
      .then((res) => {
        return setRouteData(res.data)
      })
      .catch(err => console.log(err))
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
export default EditRoute

