// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import { Users } from 'react-feather'

// ** Custom Components
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart'

const SubscribersGained = ({ icon, color, stats, statTitle, series, type }) => {
  // ** State
  const [data, setData] = useState(null)
console.log('data is series ', data?.series)
  useEffect(() => {
    axios.get('/card/card-statistics/subscribers').then(res => setData(res.data))
    return () => setData(null)
  }, [])



  return data !== null ? (
    <StatsWithAreaChart
      icon={icon}
      color={color}
      stats={stats}
      statTitle={statTitle}
      series={series}
      type={type}
    />
  ) : null
}

export default SubscribersGained
