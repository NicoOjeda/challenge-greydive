import React, { useEffect, useState } from 'react'
import {getFirestore, collection, getDocs} from 'firebase/firestore'
import app from '../credenciales'
import '../styles/List.css'

export default function List() {

const [lista, setLista] = useState([])
const db = getFirestore(app)

useEffect(()=>{

    const getLista = async()=>{
        try{
            const datos = await getDocs(collection(db,'usuarios'))
            const docs = []
            datos.forEach((doc)=>{
                docs.push({...doc.data(), id: doc.id})
            })
            setLista(docs)
        } catch(error){
            console.log(error);
        }
    }
    getLista()
},[])

  return (
    <div className='List-back'>
        <h1 className='List-title'>Usuarios Registrados</h1>
        <div className='List-box'>
    {
      lista.map(user=> (
        
            <div className='List-Card'>
                <p className='List-user'>{user.full_name}</p>
                <p className='List-dato'>Correo electrónico:</p>
                <p className='List-user'>{user.email}</p>
                <p className='List-dato'>Fecha de Nacimiento:</p>
                <p className='List-user'>{user.birth_date}</p>
                <p className='List-dato'>Nacionalidad:</p>
                <p className='List-user'>{user.country_of_origin}</p>
            </div>
        
      ))
    }
        </div>
    </div>
  )
}
