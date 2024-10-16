'use client'


import PersonalManagement from '@/components/personalComponents/NuevoPersonal'
import { TablaPersonal } from '@/components/personalComponents/TablaPersonal'
import React from 'react'

export const Personal = () => {
  return (
    <div>
        <PersonalManagement/>
        <TablaPersonal/>
    </div>
  )
}
