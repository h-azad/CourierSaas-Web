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
  ORDER_INVOICE
} from "@src/constants/apiUrls"

const InvoicePreview = () => {
  // ** HooksVars
  const { id } = useParams()
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

  const fetchCreateOrderDetailsData = (id) => {
    return useJwt
      .axiosGet(getApi(CREATE_ORDER_DETAILS) + id + "/")
      .then((res) => {
        console.log('response data', res?.data)
        setData(res.data)
      })
      .catch(err => console.log(err))
  }

  const fetchOrderInvoicePDF = (id) => {
    return useJwt
      .axiosGet(getApi(ORDER_INVOICE) + id + "/")
      .then((res) => {
        console.log('response data', res?.data)
      })
      .catch(err => console.log(err))
  }

  function downloadPDFFile(file, fileName) {
    var blob = new Blob([file], { type: 'application/pdf' })
    var url = URL.createObjectURL(blob)
    var link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handlePDFQuery = (id) => {

    return useJwt
      .axiosGet(getApi((ORDER_INVOICE) + id))
      .then((res) => {
        console.log('data --------', res?.data)
        if (res?.data?.length > 0) {
          var file = new Blob([res.data], { type: 'application/pdf' })
          var fileName = `${'Order Invoice'}.pdf`
          downloadPDFFile(file, fileName)
        }
        return res.data
      })
      .catch((err) => console.log(err))

  }
  

  useEffect(() => {
    fetchCreateOrderDetailsData(id)
    // fetchOrderInvoicePDF(id)
    
  }, [])


  return (
    <div className='invoice-preview-wrapper'>
      {/* <button onClick={() => { handlePDFQuery(32) }}>PDF</button> */}
      <Row className='invoice-preview'>
        <Col xl={9} md={8} sm={12}>
          <PreviewCard id="divcontents" data={data} />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <PreviewActions handlePDFQuery={handlePDFQuery} id={id} setSendSidebarOpen={setSendSidebarOpen} setAddPaymentOpen={setAddPaymentOpen} />
        </Col>
      </Row>
      <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen} />
      <AddPaymentSidebar toggleSidebar={toggleAddSidebar} open={addPaymentOpen} />
    </div>
  )
}

export default InvoicePreview
