import useJwt from "@src/auth/jwt/useJwt"
import { getApi, MARCHANT_GET_ORDER_REPORT } from "../constants/apiUrls"




export const handleSearchQuery = async (apiUrl, searchTerm) => {
  return useJwt
    .axiosGet(getApi(apiUrl) + '?' + searchTerm)
    .then((res) => {
      return res?.data
    })
    .catch((err) => {return []})
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


export const handlePDFQuery = (apiUrl, searchTerm, reportName) => {

  return useJwt
    .axiosGetFile(getApi((apiUrl) + '?' + searchTerm))
    .then((res) => {
      if (res.data) {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', reportName+'.pdf')
        document.body.appendChild(link)
        link.click()
      }
    })
    .catch((err) => console.log(err))

}


// export const handlePDFQuery = (apiUrl, searchTerm, reportName) => {

//   return useJwt
//     .axiosGetFile(getApi((apiUrl) + '/generatePdf/'))
//     .then((res) => {
//       console.log(res.data)
//       if (res.data) {
//         const url = window.URL.createObjectURL(new Blob([res.data]))
//         const link = document.createElement('a')
//         link.href = url
//         link.setAttribute('download', 'test.pdf')
//         document.body.appendChild(link)
//         link.click()
//       }
//       // return res.data
//     })
//     .catch((err) => console.log(err))

// }

