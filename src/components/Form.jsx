import React from 'react'
import { useEffect, useState } from 'react'

export default function Form() {

    const [data, setData] = useState([])

    const [valorInicial, setValorInicial] = useState ({
        full_name:'',
        email: '',
        birth_date: '',
        country_of_origin:'',
        terms_and_conditions:''
    })

    const capturoInput = (e)=>{
        setValorInicial({
            ...valorInicial,
            [e.target.name] : e.target.value
        })
    }

    const guardoDatos = (e)=>{
        e.preventDefault();
        console.log(valorInicial);
    }

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


const input = (user)=> (
    <>
        <label for={user.name}>{user.label}</label>
        <input  id={user.name} name={user.name} type={user.type} onChange={capturoInput} required /><br></br>
    </>
)  
const submit = (user)=> (
    <>
        <button type={user.type}>{user.label}</button>
    </>
)  

const select = (user)=> (
    <>
        <label for={user.name}>{user.label}</label><br></br>
        <select name={user.name} onChange={capturoInput}>
            <option disabled value='' selected>Selecciona un país</option>
        {
            user.options.map(option => <option value={option.value}>{option.label}</option>)
        }
        </select>
    </>
)  


  return (
    <div>
        <form onSubmit={guardoDatos}  >
        {
            data.map(user =>user.type === "select" ? 
             select(user) 
                : user.type === "submit" ? submit(user)
                : input(user)
            )
        }
        </form>
    </div>
  )
}


