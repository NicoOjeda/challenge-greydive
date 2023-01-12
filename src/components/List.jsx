import React, { useEffect, useState } from 'react'
import {getFirestore, collection, getDocs} from 'firebase/firestore'
import app from '../credenciales'

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

console.log(lista);

  return (
    <div>
    
    {
      lista.map(user=> (
        <>
            <p>{user.full_name}</p>
            <p>{user.email}</p>
            <p>{user.birth_date}</p>
            <p>{user.country_of_origin}</p>
        </>
      ))
    }
    </div>
  )
}
