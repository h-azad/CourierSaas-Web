export const OrderStatusOptions = [

  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "pickedup", label: "Picked Up" },
  { value: "in_warehouse", label: "In Warehouse" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "completed", label: "Completed" },

  { value: "failed_pickup", label: "Failed Pickup" },

  { value: "returned to warehouse", label: "Returned Warehouse" },
  { value: "hold", label: "Hold" },
  { value: "returned", label: "Returned" },
  { value: "returned assign to driver", label: "Returned Assign Driver" },
  { value: "returned to marchant", label: "Returned To Marchant" },
  { value: "returned compleate", label: "Returned Compleate" },

]



export const AdminOrderStatusOptions = [

  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "pickedup", label: "Picked Up" },
  { value: "in_warehouse", label: "In Warehouse" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "completed", label: "Completed" },
  
  { value: "failed_pickup", label: "Failed Pickup" },

  { value: "returned to warehouse", label: "Returned Warehouse" },
  { value: "hold", label: "Hold" },
  { value: "returned", label: "Returned" },
  { value: "returned assign to driver", label: "Returned Assign Driver" },
  { value: "returned to marchant", label: "Returned To Marchant" },
  { value: "returned compleate", label: "Returned Compleate" },

]


export const MarchantOrderStatusOptions = [

  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "pickedup", label: "Picked Up" },
  { value: "in_warehouse", label: "In Warehouse" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "completed", label: "Completed" },

  { value: "failed_pickup", label: "Failed Pickup" },

  { value: "returned to warehouse", label: "Returned Warehouse" },
  { value: "hold", label: "Hold" },
  { value: "returned", label: "Returned" },
  { value: "returned assign to driver", label: "Returned Assign Driver" },
  { value: "returned to marchant", label: "Returned To Marchant" },
  { value: "returned compleate", label: "Returned Compleate" },

]



export const RiderOrderStatusOptions = [

  { value: "accepted", label: "Accepted" },
  { value: "pickedup", label: "Picked Up" },
  { value: "in_warehouse", label: "In Warehouse" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "completed", label: "Completed" },

  { value: "failed_pickup", label: "Failed Pickup" },

  { value: "returned to warehouse", label: "Returned Warehouse" },
  { value: "hold", label: "Hold" },
  { value: "returned", label: "Returned" },
  { value: "returned assign to driver", label: "Returned Assign Driver" },
  { value: "returned to marchant", label: "Returned To Marchant" },
  { value: "returned compleate", label: "Returned Compleate" },

]


export function colorSwitch(status) {
  switch (status) {
    case 'pending':
      return 'yellow'

    case 'accepted':
      return 'green'

    case 'pickedup':
      return 'blue'

    case 'in_warehouse':
      return 'orange'

    case 'shipped':
      return 'purple'

    case 'delivered':
      return 'green'

    case 'hold':
      return 'red'

    case 'returned':
      return 'orange'

    case 'cancelled':
      return 'red'

    case 'completed':
      return 'green'

    case 'returned to warehouse':
      return 'orange'

    default:
      return 'orange'
  }
}