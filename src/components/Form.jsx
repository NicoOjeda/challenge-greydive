import React from 'react'
import { useEffect, useState } from 'react'
import app from '../credenciales'
import {getFirestore, collection, addDoc} from 'firebase/firestore'
import swal from 'sweetalert';
import { useNavigate } from 'react-router';
import '../styles/Form.css'


export default function Form() {

    const [data, setData] = useState([])
    const db = getFirestore(app)
    const navigate = useNavigate()

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

    const guardoDatos = async(e)=>{
        e.preventDefault();
        console.log(valorInicial);
        try{
            await addDoc(collection(db,'usuarios'),{
                ...valorInicial
            })
            if(valorInicial){
                swal({
                    title: "Excelent",
                    text:  "usuario creado",
                    icon: "success",
                    timer: "3000"
                })
                navigate('/users')
               }
            
        }catch(error){
            console.log(error);
        }
        e.target.reset()
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
    <div className='Form-inputbox'>
        <label className='Form-label' for={user.name}>{user.label}</label>
        <input  className='Form-input' id={user.name} name={user.name} type={user.type} onChange={capturoInput} required />
    </div>
)  
const check = (user)=> (
    <div className='Form-check'>
        <label for={user.name}>{user.label}</label>
        <input   className='Form-inputcheck' id={user.name} name={user.name} type={user.type} onChange={capturoInput} required />
    </div>
)  
const submit = (user)=> (
    <>
        <button className="Form-button" type={user.type}>{user.label}</button>
    </>
)  

const select = (user)=> (
    <div className='Form-inputbox'>
        <label  for={user.name}>{user.label}</label>
        <select className='Form-input' name={user.name} onChange={capturoInput}>
            <option disabled value='' defaultValue>Selecciona un país</option>
        {
            user.options.map(option => <option  value={option.value}>{option.label}</option>)
        }
        </select>
    </div>
)  


  return (
    <div className='Form-Back'>
        <div className='Form-box'>
            <h1 className='Form-title'>Challenge greydive.</h1>

            <form onSubmit={guardoDatos} className='Form-table' >
            {
                data.map(user =>user.type === "select" ? 
                select(user) 
                    : user.type === "submit" ? submit(user)
                    : user.type === "checkbox" ? check(user)
                    : input(user)
                )
            }
            </form>
        </div>
    </div>
  )
}


