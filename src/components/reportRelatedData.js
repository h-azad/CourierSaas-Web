import useJwt from "@src/auth/jwt/useJwt"
import { getApi } from "@src/constants/apiUrls"




export const handleSearchQuery = async (apiUrl, searchTerm) => {
  return useJwt
    .axiosGet(getApi(apiUrl) + '?' + searchTerm)
    .then((res) => {
      return res?.data
    })
    .catch((err) => {return []})
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


export const DownloadPDFOrderReport = (apiUrl, filterKeys, reportName) => {

  return useJwt
    .axiosGetFile(getApi((apiUrl) + '?' + filterKeys))
    .then((res) => {
      if (res.data) {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', reportName + '.pdf')
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

