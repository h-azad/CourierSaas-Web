
import { useSelector } from "react-redux"

export const getApplicationSettingData = () => {
  var x = localStorage.getItem("applicationData")

  return JSON.parse(x)
}