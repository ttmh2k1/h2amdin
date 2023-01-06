import React from 'react'
import { FaReceipt, FaShippingFast } from 'react-icons/fa'

export const shipper = [
  {
    name: 'ORDER',
    items: [
      {
        url: '/order',
        text: 'Order',
        icon: <FaReceipt />,
      },
      {
        url: '/delivery',
        text: 'Delivery',
        icon: <FaShippingFast />,
      },
    ],
  },
]
