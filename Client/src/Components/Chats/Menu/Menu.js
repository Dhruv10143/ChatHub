import React from 'react'
import Header from './Header'
import Search from './Search'
import Conversations from './Conversations'
import { useState } from 'react'

const Menu=()=> {
  const [text,setText]=useState('')
  return (
    <div className='  h-[100%]'>
    <Header />
    <Search setText={setText}/>
    <Conversations text={text}/>
    </div>
  )
}

export default Menu