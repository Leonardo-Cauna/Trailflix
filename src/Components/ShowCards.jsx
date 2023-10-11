import TaskCard from "./TaskCard"
// export const runtime = "edge";
async function LoadElements(){
    const res = await fetch(`${process.env.REACT_APP_LOCALHOST}/api/elements?${Date.now()}`)
    console.log(process.env.REACT_APP_LOCALHOST)
    return await res.json()
  }
export default async function ShowCards (){
    const data = await LoadElements()
    const elements = data.elements
    return(
        <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10'>
        {elements.map((element)=>(
            <TaskCard element = {element} link = {process.env.REACT_APP_LOCALHOST} key = {element.id}/>
        ))}
        </div>
)}
    
    