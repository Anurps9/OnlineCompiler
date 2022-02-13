import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Dashboard(){
    const user = useContext(AuthContext).user
    const cardText = [
        'Create your own prompt. Provide the problem statment, test input and output files.',
        'Create a collection of prompts. Search for prompts from our collection or make one of your own.',
        'Check all the prompts available on the platform.'
    ]
    return (
        <div>
            <div className='text-5xl text-lime-700 align-middle w-full text-center mt-24'>Welcome {user.firstName}!</div>
            <div className="flex flex-row justify-evenly mx-4 mt-6" id="teacher-dashboard">
                <br/>
                <Card link='/problem/new' text={cardText[0]} buttonText='Create New Prompt'/>
                <Card link='/room/new' text={cardText[1]} buttonText='Create New Room' />
                <Card link='/problem' text={cardText[2]} buttonText='Prompts' />
            </div>
        </div>
    )
}

function Card(props){
    return (
        <div className="flex-col border-2 rounded-md w-full h-56 text-center m-4 p-2.5 pt-4">
            <div className="text-lg h-4/6 font-light text-justify px-3">{props.text}</div>
            <div className="hover:scale-105 bg-lime-700 rounded-sm p-2 text-white top-4 relative w-11/12 m-auto"><Link className='hover:text-white w-full' to={props.link}>{props.buttonText}</Link></div>
        </div>
    )
}