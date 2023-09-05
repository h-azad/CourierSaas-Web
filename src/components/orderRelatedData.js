export const OrderStatusOptions = [
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "pickedup", label: "Picked Up" },
  { value: "in_warehouse", label: "In Warehouse" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "hold", label: "Hold" },
  { value: "returned", label: "Returned" },
  { value: "cancelled", label: "Cancelled" },
  { value: "completed", label: "Completed" },
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