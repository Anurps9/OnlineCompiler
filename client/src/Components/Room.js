import axios from "axios"
import { useEffect, useState } from "react"

export function NewRoom(){
    const [problemCode, setProblemCode] = useState('')
    const [roomId, setRoomId] = useState('')
    return (
        <div className="flex flex-row w-full justify-between" id="new-room">
            <div className="w-7/12">
                <div>
                    <div className="mt-4 ml-2 text-center text-xl mb-2 text-lime-600">Add prompts</div>
                    <input className="h-8 border-2 w-10/12 focus:outline-none mt-2 ml-2 pl-2" placeholder="Enter problem code" value={problemCode} onChange={(e)=>setProblemCode(e.target.value)}/>
                    <input className='w-1/12 bg-lime-600 text-white p-1 rounded-sm h-8' type="button" value="Search"/>
                    <div className="text-sm text-center mt-8">Prompts added will be shown here.</div>
                </div>
            </div>
            <div className="text-center mt-6 w-5/12 border-1">
                <p className="mt-3">Choose an ID for your room.</p>
                <input className="pl-2 h-8 mt-3 border-2 w-11/12 m-auto focus:outline-none" type='text' value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Enter room ID"/>
            </div>
        </div>
    )
}