import React from 'react'
import { useEffect, useState } from 'react'

export default function Form() {

    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('/db.json')
        .then(response => response.json())
        .then(items=>{ 
            setData(items.items)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
 
console.log(data)

const input = (user)=> (
    <>
        <label for={user.name}>{user.label}</label>
        <input  id={user.name} name={user.name} type={user.type} required />
    </>
)  

const select = (user)=> (
    <>
        <label for={user.name}>{user.label}</label>
        <select name={user.name}>
            <option disabled value='' selected>Selecciona un país</option>
        {
            user.options.map(option => <option value={option.value}>{option.label}</option>)
        }
        </select>
    </>
)  


  return (
    <div>
        <form className='NewHotel-form'  >
        {
            data.map(user =>user.type === "select" ? 
             select(user) 
             : input(user)

            )
        }
        </form>
    </div>
  )
}


