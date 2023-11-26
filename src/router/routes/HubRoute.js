import HubAdminDashboard from "@src/views/dashboard/hub_admin/hubAdminDashboard"
import HubAdminCreateMerchant from "@src/views/merchants/hubAdmin/hubAdminCreateMarchant"




const HubRoute = [
  {
    path: "/hub/admin-dashboard",
    element: <HubAdminDashboard />
  }, 
  {
    path: "/hub/admin-dashboard",
    element: <HubAdminCreateMerchant />
  },

  // {
  //   path: "/merchants",
  //   element: <MerchantList />
  // },
  // {
  //   path: "/hub/merchants/add",
  //   element: <HubAdminCreateMerchant />
  // },
  // {
  //   path: "hub/merchants/edit/:id",
  //   element: <EditMerchants />
  // },
  // {
  //   path: "hub/merchants/view/:id",
  //   element: <MarchantView />
  // },


]

export default [...HubRoute]