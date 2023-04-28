import React, { useEffect, useState } from 'react'
import { AiFillCloseSquare, AiFillCheckSquare } from 'react-icons/ai';
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs';

const PendingWorks = () => {
    const [list, setList] = useState([]);
    const [onPage, setOnPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const fetchList = async () => {
        const response = await fetch(`https://dummyjson.com/todos?limit=15&skip=${onPage * 10 - 10}`);
        const data = await response.json();
       if(data && data.todos){
        setList(data.todos);
        setTotalPages(data.total/15)
        console.log(data);
       }
    }

    useEffect(()=> {
        fetchList();
    }, [onPage])

    const selectPageHandler = (selectedPage)=> {
        if(selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== onPage )
        setOnPage(selectedPage)
    }

  return (
    <>

<div className='container mx-auto'>
    <div className=" flex flex-row justify-center items-center py-2 top-0 left-0 sticky bg-gray-200  ">
        <h1 className="text-gray-600 text-3xl lg:text-5xl font-bold uppercase tracking-widest">Pending Works</h1>
    </div>

<div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10 p-5">
{
    list.map((todo,i)=> {
        return <div className='bg-gray-300 rounded-lg p-7 lg:p-10 text-gray-600 font-bold flex flex-col justify-start items-start' key={i}>
                <span className='text-3xl lg:text-4xl font-bold uppercase tracking-widest'>{todo.todo}</span>
                <span className={`text-2xl lg:text-3xl tracking-widest uppercase ${todo?.completed === true ? "text-green-600" : "text-red-500"}`}>{todo.completed ? <span className="flex flex-row justify-center items-center space-x-3"><AiFillCheckSquare/> <span>Completed</span></span>  : <span className="flex flex-row justify-center items-center space-x-3"><AiFillCloseSquare/> <span>Pending</span></span>}</span>
        </div>
    })
}

</div>

{
            list.length > 0 && <div className='flex flex-row justify-center items-center space-x-1 py-4'>
                <span onClick={()=> selectPageHandler(onPage - 1)} className={` ${onPage > 1 ? "" : "hidden"}   text-2xl text-indigo-600 hover:text-indigo-700  cursor-pointer`}><BsFillArrowLeftSquareFill/></span>
                {
                    [...Array(totalPages)].map((_,i)=> {
                        return <span onClick={()=> selectPageHandler(i+1)} key={i} className={` ${onPage === i+1 ? "bg-indigo-500" : "bg-gray-200"} p-2 rounded-lg text-gray-800 hover:bg-gray-400 cursor-pointer`}>{i + 1}</span>
                    })
                }
                <span onClick={()=> selectPageHandler(onPage + 1)} className={` ${onPage < totalPages ? "" : "hidden"} text-2xl text-indigo-600 hover:text-indigo-700 cursor-pointer`}><BsFillArrowRightSquareFill/></span>
            </div>
        }






</div>

     </>
  )
}

export default PendingWorks