// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Third Party Components
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment'
import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice'

// ** Styles
import '@styles/base/pages/app-invoice.scss'

import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  CREATE_ORDER_DETAILS,
} from "@src/constants/apiUrls"

const InvoicePreview = () => {
  // ** HooksVars
  // const { id } = useParams()
  // const id = 26

  // ** States
  const [data, setData] = useState(null)
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)

  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen)

  // // ** Get invoice on mount based on id
  // useEffect(() => {
  //   axios.get(`/api/invoice/invoices/${id}`).then(response => {
  //     setData(response.data)
  //   })
  // }, [])

  const fetchCreateOrderDetailsData = (orderID) => {
    return useJwt
      .axiosGet(getApi(CREATE_ORDER_DETAILS) + orderID + "/")
      .then((res) => {
        console.log('response data', res?.data)
        setData(res.data)
      })
      .catch(err => console.log(err))
  }


  useEffect(() => {
    fetchCreateOrderDetailsData(26)
  }, [])


  return (
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col xl={9} md={8} sm={12}>
          <PreviewCard data={data} />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <PreviewActions id={26} setSendSidebarOpen={setSendSidebarOpen} setAddPaymentOpen={setAddPaymentOpen} />
        </Col>
      </Row>
      <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen} />
      <AddPaymentSidebar toggleSidebar={toggleAddSidebar} open={addPaymentOpen} />
    </div>
  )
}

export default InvoicePreview
