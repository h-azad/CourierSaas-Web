import {
  Table,
} from "reactstrap"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, ACCOUNT_WALLET_LIST } from "../../../constants/apiUrls"

const MarchantWallet = () => {

  const [balance, setBalance] = useState()
  const [name, setName] = useState()





  useEffect(() => {
    fetchAccountWalletData()
  }, [])


  const fetchAccountWalletData = () => {
    return useJwt
      .axiosGet(getApi(ACCOUNT_WALLET_LIST))
      .then((res) => {
        console.log("res", res.data)
        setBalance(res.data?.balance)
        setName(res.data?.account_name)
        return res.data
      })
      .catch(err => console.log(err))
  }



  return (
    <>
      <Table bordered>
        <thead>
          <tr>
            <th>Marchant Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="align-middle fw-bold">{name}</span>
            </td>
            <td>
              <span className="align-middle fw-bold">{balance}</span>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default MarchantWallet
