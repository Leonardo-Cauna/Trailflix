"use client"
// import { useRadioGroup } from '@mui/material/RadioGroup'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"



export default function NewPage ({params}){
    // console.log(params);
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [adultsOnly, setAdults] = useState(false)
    useEffect(() =>{
        if(params.id){
            fetch('/api/elements/'+params.id)
                .then((res) => res.json())
                .catch((error) => console.log(error))
                .then((data) =>{
                    console.log(data)
                    if (data.elements.state != 0) {
                        setTitle(data.elements.title)
                        setDescription(data.elements.description)
                        setAdults(data.elements.adultsOnly)
                    }
                    else{
                        alert(data.elements.Response, data.elements.Error)
                    }
                })
                .catch((error) => console.log(error))
        }
    }, []);
    
    const onSubmit = async (e) =>{
        e.preventDefault()

        if(params.id){
            try {
                console.log(adultsOnly);
                const res = await fetch('/api/elements/'+params.id, {
                method: "PUT",
                body: JSON.stringify({title, description, adultsOnly}),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            console.log(data);
            } catch (error) {
                console.log(error);
            }
            
        }
        else{

            try {
                // adultsOnly == "on" ? setAdults(true) : setAdults(false) 
                console.log(adultsOnly);
                const res = await fetch('/api/elements', {
                method:'POST',
                body: JSON.stringify({title, description, adultsOnly}),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            console.log(data);
            } catch (error) {
                console.log(error);
            }
            
        }
        router.refresh()
        router.push('/')
    }

    return(
        <div className="h-screen flex justify-center items-center">
            <form action="" className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2" onSubmit={onSubmit}>

                <label htmlFor="title" className="font-bold text-sm text-slate-200">
                    Element Title
                </label>

                <input type="text" id="title" className="border border-gray-400 p-2 mb-4 w-full text-black"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                />
                
                <label htmlFor="description" className="font-bold text-sm text-slate-200">
                    Task Description
                </label>
                <textarea id="description" rows="3" className="text-black border border-gray-400 p-2 mb-4 w-full" placeholder="Insert a description for your task" 
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                >
                
                </textarea>
                <div className="flex align-middle">
                    <input type="checkbox" name="adults" id="adults" className="align-middle" onChange={(e) => { 
                    setAdults(e.target.value) 
                    setAdults(!adultsOnly) 
                    }}
                    checked={adultsOnly}
                    />
                    <label htmlFor="adults" className="font-bold text-sm text-slate-200 ml-2">
                        Adults only movie?
                    </label>
                </div>
                

                
                <div className={params.id ? "flex justify-between":"flex justify-center"} >
                    <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {params.id ? "Edit":"Create"}
                    </button>
                    {
                        params.id && (
                            <button type="button" className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={async () =>{
                                const res = await fetch('/api/elements/'+params.id, {
                                    method: "DELETE"
                                })
                                const data = await res.json()
                                alert(`${data.response} N° ${data.elements.id}`)
                                console.log(data)
                                router.refresh()
                                router.push('/')
                            }}>
                                Delete
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
)}