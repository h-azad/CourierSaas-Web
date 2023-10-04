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

import {Steps } from 'antd'
import Form1 from "./form1"
import Form2 from "./form2"
import Form3 from "./form3"


const AddRoute = () => {
  const [current, setCurrent] = useState(0)
  const [startTime, setStarTime] = useState()
  const [title, setTitle] = useState()
  const [startLocation, setStartLocation] = useState()
  const [coordinate, setCoordinate] = useState()
  const navigate = useNavigate()

  const [city, setCity] = useState()
  const [areas, setAreas] = useState([])
  const [routeFinishing, setRouteFinishing] = useState()
  


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
  formData.append('coordinate', coordinate)


  const headers = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const SubmitDataHandler = () => {
    return useJwt
      .axiosPost(getApi(ROUTE), formData, headers)
      .then((res) => {
        console.log('Hello Route')
        navigate("/route")
        SwalAlert("Route Added Successfully")
      })
      .catch(err => console.log(err))
  }

  const steps = [
    {
      title: 'Route Information',
      content: <Form1 setCoordinate={setCoordinate} setStarTime={setStarTime} setTitle={setTitle} setStartLocation={setStartLocation} next={next} />,
    },
    {
      title: 'Route',
      content: <Form2 setCity={setCity} setAreas={setAreas} next={next} prev={prev} />,
    },
    {
      title: 'Finishing',
      content: <Form3 setRouteFinishing={setRouteFinishing} SubmitDataHandler={SubmitDataHandler} />,
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
