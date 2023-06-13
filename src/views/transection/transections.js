

import {Search } from "react-feather"
import {
  Table,
  Button,
  CardText,

} from "reactstrap"
import { useEffect, useState } from "react"

import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
   TRANSECTIONS,
  TRANSECTIONS_FILTER,
} from "../../constants/apiUrls"

// import { TRANSECTIONS } from "../../constants/apiUrls"



const Transections = () => {
  const [transections, setTransections] = useState([])


  useEffect(() => {
     fetchTransectionsData()
  }, [])



  const  fetchTransectionsData = () => {
    return useJwt
      .axiosGet(getApi( TRANSECTIONS))
      .then((res) => {
        setTransections(res.data)
        console.log('res',res.data)
        return res.data
      })
      .catch((err) => console.log(err))
  }


  const  fetchSearchsetTransectionsData = searchTerm => {
    return useJwt
      // .axiosGet(getApi(RIDER_SEARCH)+'?search='+ searchTerm) //after line
      .axiosGet(getApi(TRANSECTIONS_FILTER) + '?search=' + searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    console.log(e.target.value)
    const searchTerm = e.target.value
    if (searchTerm.length > 0) {
       fetchSearchsetTransectionsData(searchTerm)
        .then(data => {
          if (data.length > 0) {
            console.log('res', data)
            setTransections(data)
          } else {
            console.log("No data")
          }
        })
    } else {
       fetchTransectionsData()
    }

  }, 300)


  function debounce(fn, time) {
    let timeoutId
    return wrapper
    function wrapper(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        timeoutId = null
        fn(...args)
      }, time)
    }
  }

  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Transections"
                name="user_name"
                type="text"
                class="form-control"
                // value=""
                onChange={handleSearch}
              />
              <Button.Ripple className="btn-icon ms-1" outline color="primary">
                <Search size={16} />
              </Button.Ripple>
            </div>
          </div>
        </div>
      </CardText>
      <div class="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Amount</th>
              <th>Transections ID</th>
              <th>Remark</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transections &&
              transections.map((info) => (
                <tr key={info.id}>
                  <td>
                    <span className="align-middle fw-bold">{info.user_name}</span>
                  </td>
                  <td>{info.amount}</td>
                  <td>{info.transection_id}</td>
                  <td>{info.remark}</td>
                  <td>{info.type}</td>
                  <td>{info.created_at}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default Transections

