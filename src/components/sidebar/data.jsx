import React from 'react'
import {
  FaUserFriends,
  FaChartPie,
  FaChartBar,
  FaUsers,
  FaUserCog,
  FaRegListAlt,
  FaReceipt,
  FaBoxes,
  FaBox,
  FaUser,
  FaWarehouse,
} from 'react-icons/fa'
export const links = [
  {
    name: 'SETTING',
    items: [
      {
        url: '/user',
        text: 'User',
        icon: <FaUsers />,
      },
      {
        url: '/role',
        text: 'Role',
        icon: <FaUserCog />,
      },
      {
        url: '/logs',
        text: 'Logs',
        icon: <FaRegListAlt />,
      },
    ],
  },
  {
    name: 'ORDER',
    items: [
      {
        url: '/order',
        text: 'Order',
        icon: <FaReceipt />,
      },
    ],
  },
  {
    name: 'CATEGORY',
    items: [
      {
        url: '/productGroup',
        text: 'Product Group',
        icon: <FaBoxes />,
      },
      {
        url: '/product',
        text: 'Product',
        icon: <FaBox />,
      },
      {
        url: '/customerGroup',
        text: 'Customer Group',
        icon: <FaUserFriends />,
      },
      {
        url: '/customer',
        text: 'Customer',
        icon: <FaUser />,
      },
      {
        url: '/warehouse',
        text: 'Warehouse',
        icon: <FaWarehouse />,
      },
    ],
  },
  {
    name: 'REPORT',
    items: [
      {
        url: '/businessReport',
        text: 'Business Report',
        icon: <FaChartBar />,
      },
      {
        url: '/systemReport',
        text: 'System Report',
        icon: <FaChartPie />,
      },
    ],
  },
]
