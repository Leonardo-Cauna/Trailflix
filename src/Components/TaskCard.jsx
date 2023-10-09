"use client"
import { Checkbox } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'



export default function TaskCard ({ element }){
    const [uprating, setUpRating] = useState(false)
    const [downrating, setDownRating] = useState(false)

    async function LoadElement(){
        // const res = await fetch(`http://localhost:3000/api/elements/${element.id}?${Date.now()}`)
        const res = 1
        console.log(res);
        // return await res.json()
        return 1
    }

    async function uploadRating(id, totalRatings){
        try {
            const res = await fetch('/api/elements/'+id, {
            method: "PUT",
            body: JSON.stringify({totalRatings}),
            headers:{
                'Content-Type': 'application/json'
            }})
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    async function upRating(value){
        if(value===0){
                const data = await LoadElement()
                let totalRatings = data.elements.totalRatings
                totalRatings++
                uploadRating(data.elements.id, totalRatings)
        }
        else if(value===1){
            const data = await LoadElement()
            let totalRatings = data.elements.totalRatings
            totalRatings--
            uploadRating(data.elements.id, totalRatings)
        }
    }
    
    async function downRating(value){
        const data = await LoadElement()
        let totalRatings = data.elements.totalRatings
        if(value===0){
            totalRatings++
            uploadRating(data.elements.id, totalRatings)
        }
        else if(value===1){
            totalRatings--
            uploadRating(data.elements.id, totalRatings)
        }
    }
    return(
        <div className='bg-slate-900 p-3 hover:bg-slate-800 hover:cursor-pointer'>
        <h3 className='font-bold text-2xl mb-2 text-slate-300'>{element.title}</h3>
        <p className='text-slate-400'>{element.description}</p>
        <p className='text-slate-400'>{element.premiere == null ? "Unknown":new Date(element.premiere).toDateString()}</p>
        <p className='text-slate-400'>{element.rating}</p>
        <p className='text-slate-400'>{element.totalRatings}</p>
        <input type='checkbox' value="up" id={`upVote${element.id}`} 
            onChange={(e) => { 
                setUpRating(e.target.value) 
                setUpRating(!uprating) 
                if(uprating === false){
                    localStorage.removeItem("thumbsDown")
                    localStorage.setItem("thumbsUp", true)
                    if (document.getElementById(`downVote${element.id}`).checked == true) {
                        document.getElementById(`downVote${element.id}`).checked = false
                        setUpRating(true)
                        setDownRating(false)
                    }
                    else upRating(0)
                }
                else if(uprating === true){
                    localStorage.removeItem("thumbsUp")
                    setUpRating(false)
                    upRating(1)
                }
            }}>
        </input>
        <input type='checkbox' value="down" id={`downVote${element.id}`} 
            onChange={(e) => { 
                setDownRating(e.target.value) 
                setDownRating(!downrating) 
                if(downrating === false){
                    localStorage.removeItem("thumbsUp")
                    localStorage.setItem("thumbsDown", true)
                    if (document.getElementById(`upVote${element.id}`).checked == true) {
                        document.getElementById(`upVote${element.id}`).checked = false
                        setDownRating(true)
                        setUpRating(false)
                    }
                    else downRating(0)
                }  
                else if(downrating === true){
                    localStorage.removeItem("thumbsDown")
                    setDownRating(false)
                    downRating(1)
                }
            }}>
        </input>
    </div>
)}