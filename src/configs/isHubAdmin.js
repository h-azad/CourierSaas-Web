export const isHubAdmin = () => {
  var x = localStorage.getItem("userData")
  var jsonData = JSON.parse(x)
  return jsonData?.hub_admin
}