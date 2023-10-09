import TaskCard from "./TaskCard"

async function LoadElements(){
    // const res = await fetch(`http://localhost:3000/api/elements?${Date.now()}`)
    const res = 1
    // return await res.json()
    return 1
  }
export default async function ShowCards (){
    const data = await LoadElements()
    const elements = data.elements
    return(
        <div className='grid grid-cols-3 gap-3 mt-10'>
        {elements.map((element)=>(
            <TaskCard element = {element} key = {element.id}/>
        ))}
        </div>
)}
    
    