import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";

export function NewProblem(){

    const [data, setData] = useState({
        title: '',
        statement: '',
        sampleInput: '',
        sampleOutput: '',
        testInput: null,
        testOutput: null
    })

    const handleChange = (e) => {
        if(e.target.name)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleUpload = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.files[0]
        })
    }

    const handleSubmit = () => {

        if(data.title==='' || data.statement==='' || data.sampleInput==='', data.sampleOutput==='' || data.testInput===null || data.testOutput===null){
            alert('Please fill all the fields.');
            return;
        }

        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('statement', data.statement)
        formData.append('sampleInput', data.sampleInput)
        formData.append('sampleOutput', data.sampleOutput)
        formData.append('testFile', data.testInput)
        formData.append('testFile', data.testOutput)
        axios
        .post('/problem/', formData)
        .then((res) => {
            console.log(res);
        })
    }

    return (
        <div id="new-problem" className='flex flex-row w-full'>
            <div className="flex ml-2 flex-col justify-between">
                <input className='focus:outline-none border-2 mt-4 p-2 my-2 rounded-sm text-sm' value={data.name} placeholder="Title" onChange={handleChange} name="title" required/>
                <textarea className='focus:outline-none border-2  p-2 my-2 rounded-sm text-sm' onChange={handleChange} name="statement" id="problem-statement" value={data.statement} placeholder="Problem Statement" required></textarea>
                <textarea className='focus:outline-none border-2  p-2 my-2 rounded-sm text-sm' onChange={handleChange} name="sampleInput" id="sample-input" value={data.sampleInput} placeholder="Sample Input" required></textarea>
                <textarea className='focus:outline-none border-2 p-2  my-2 rounded-sm text-sm' onChange={handleChange} name="sampleOutput" id="sample-output" value={data.sampleOutput} placeholder="Sample Output" required></textarea><br/>
            </div>
            <div className='pt-4 flex flex-col justify-start w-full'>
                <div className="text-center text-sm border-2 py-4 mx-auto w-11/12">
                    <div className="mb-2">Test Input</div>
                    <input className='border-1' onChange={handleUpload} type="file" id="test-input-file" name="testInput" accept=".txt" required/>
                </div>
                <div className="text-center text-sm border-2 py-4 mx-auto my-4 w-11/12">
                    <div className="mb-2">Test Output</div>
                    <input className='border-1' onChange={handleUpload} type="file" id="test-output-file" name="testOutput" accept=".txt" required/>
                </div>
                <div className="text-center"><input className='w-11/12 mx-auto bg-lime-600 px-0 py-2 text-white rounded-sm' type="button" onClick={handleSubmit} value="Create"/></div>
            </div>
           
            <br/>
        </div>
    )
}

export function ProblemList(){

    const [problemList, setProblemList] = useState(null)
    useEffect(() => {
        axios
        .get('/problem')
        .then((res) => {
            const newProblemList = [];
            res.data.forEach((problem) => {
                newProblemList.push(
                    {
                        id: problem._id,
                        title: problem.title
                    }
                )
            })
            setProblemList(newProblemList);
        })
    }, [])
    

    return (
        problemList
        ?
        <div>
           {
             problemList.map((problem) => (
                <p><Link key={problem.id} to={`/problem/${problem.id}`}>{problem.title}</Link></p>
            ))
           }
        </div>
        :
        <div>Loading...</div>
        
    )
}

export function Problem(){
    const params = useParams();
    const [problem, setProblem] = useState(null)

    useEffect(() => {
        axios
        .get(`/problem/${params.id}`)
        .then((res) => {
            setProblem(res.data);
        })
    }, [])

    return(
        problem 
        ?
        <div>
            Single problem will be shown here.
            <p>{problem.title}</p>
            <p>{problem.statement}</p>
            <div>{problem.sampleInput}</div>
            <div>{problem.sampleOutput}</div>
        </div>
        :
        <div>Loading...</div>
    )
}