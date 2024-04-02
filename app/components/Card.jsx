import { MdRadioButtonChecked } from "react-icons/md";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import {AiOutlineDelete} from 'react-icons/ai'
import { useContext } from "react";
import { MyContext } from "../Context/Context";

function Card({ entity }) {

    const { startEdit,removeTask, setCurrentTask } = useContext(MyContext)

  return (
    <div className='card flex flex-col bg-[#0f0f0f] w-full py-4 px-4 rounded-md border-[0.5px] border-[#202020] shadow-md shadow-[#0f0f0f]'
    onClick={() => setCurrentTask(entity)}> 
        <div className='flex flex-col'>
            <h1 className="text-lg font-medium">{entity.data.title}</h1>
            <p className="text-[15px] mt-1.5 max-h-[70px]text-gray-300 overflow-hidden">
                {entity.data.desc.length >= 100 ? entity.data.desc.slice(0, 110) + ".." : entity.data.desc}
            </p>
        </div>
        <div className="flex flex-row justify-between items-center mt-auto mb-1 border-t-[1px] h-8 border-[#222222] pt-4">
            <div>

                {!entity.data.isCompleted 
                ? <button className="flex items-center justify-center bg-[#3f3b28] text-[#faf60e] text-[13px] h-fit leading-[24px] px-3 py-0.5 rounded-full tracking-tight font-normal">
                    Ongoing
                </button>
                 : <button className="flex items-center justify-center bg-[#263b2d] text-[#1ddb8c] text-[13px] h-fit leading-[24px] px-3 py-0.5 rounded-full tracking-tight font-normal">
                    Completed
                </button>}
            </div>
            <div className="flex flex-row gap-3 items-center justify-center text-base">
                <RiEditFill id={entity.id} onClick={() => startEdit(entity)}/>
                <AiOutlineDelete id={entity.id} className="hover:text-red-600" onClick={() => removeTask(entity.id)}/>
                
            </div>
        </div>
    </div>
  )
}

export default Card