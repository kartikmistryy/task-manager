import { MdRadioButtonChecked } from "react-icons/md";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { MyContext } from "../Context/Context";

function Card({ entity }) {

    const { startEdit,removeTask } = useContext(MyContext)

  return (
    <div className='flex flex-col bg-[#171718] md:max-w-[290px] md:w-[290px] md:h-[250px] min-h-[200px] h-full w-full py-4 px-4 rounded-md border-[1px] border-[#2e2e2e]'>
        <div className='flex flex-col'>
            <h1 className="text-lg font-medium">{entity.data.title}</h1>
            <p className="text-[15px] mt-1.5 text-gray-300">{entity.data.desc}</p>
        </div>
        <div className="flex flex-row justify-between items-center mt-auto mb-1 border-t-[1px] border-[#2e2e2e] pt-4">
            <div>

                {!entity.data.isCompleted 
                ? <button className="flex items-center justify-center bg-[#fcf4d2] hover:bg-[#ffefb1] text-yellow-900 text-[15px] h-fit py-[1px]  w-fit px-1.5 rounded-[14px] tracking-tight font-medium">
                    Ongoing
                </button>
                 : <button className="flex items-center justify-center bg-[#c6ffc6] hover:bg-[#b6fcb6] text-green-950 text-[15px] h-fit py-[1px]  w-fit px-1.5 rounded-[14px] tracking-tight font-medium">
                    Completed
                </button>}
            </div>
            <div className="flex flex-row gap-3 items-center justify-center text-base">
                <RiEditFill id={entity.id} onClick={() => startEdit(entity)}/>
                <MdDelete id={entity.id} onClick={() => removeTask(entity.id)}/>
            </div>
        </div>
    </div>
  )
}

export default Card