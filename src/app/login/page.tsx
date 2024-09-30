'use client'

import LoginForm from '@/components/loginComponents/Login'
import React from 'react'

export default function CreateNewPage() {
  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded-lg shadow-md"> 
      <img 
      className='ml-32 w-40 h-40 justify-items-center'
      src='https://media.istockphoto.com/id/1153582583/es/vector/la-abuela-est%C3%A1-cocinando-lindo-estilo-conjunto-de-dise%C3%B1o-vectorial-vector.jpg?s=612x612&w=0&k=20&c=gZ1MIbyVQs9iV6CcvzyAygcTocR4cCFWaDyA0q4MIWU='/>
        <LoginForm/>    
    </div>
  )
}
