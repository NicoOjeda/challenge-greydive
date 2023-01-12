import React from 'react'
import Footer from '../components/Footer'

export default function Main(props) {
  return (
    <div>
        {props.children}
        <Footer/>
    </div>
  )
}
