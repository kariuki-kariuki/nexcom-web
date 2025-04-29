import React from 'react'
import { BusinessCard } from '../BusinessCard/BusinessCard'
const Business = () => {
  const businessCards = Array.from([1..toExponential(8)]).map(() => <BusinessCard />)
  return (
    <div>
      {businessCards}
    </div>
  )
}

export default Business