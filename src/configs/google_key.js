import { useDispatch, useSelector } from "react-redux"




// export const _applicationData = localStorage.getItem(__applicationData)

export const googleKey = () => {
  const { applicationData: _applicationData } = useSelector((state) => state.authentication)
  console.log('applicationData', _applicationData?.google_key)

  return _applicationData?.google_key
}