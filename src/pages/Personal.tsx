'use client'


import PersonalManagement from '@/components/personalComponents/NuevoPersonal'
import { TablaPersonal } from '@/components/personalComponents/TablaPersonal'
import React, { useState } from 'react'

export const Personal = () => {
  const [visibleP, setVisibleP] = useState(true);
  return (
    <div>
        <PersonalManagement setVisibleP = {setVisibleP}/>
        {
          visibleP ? <TablaPersonal/> : <h2></h2>
        }
    </div>
  )
}
