import axios from "axios";
import { useEffect, useState } from "react"
import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

export default function Prompt(){
    const [code, setCode] = useState('');
    const [status, setStatus] = useState('');
    const handleClick = (e) => {
        setStatus('Checking...')
        e.preventDefault();
        axios
        .post('/compiler', {
            data: code
        })
        .then((res) => {
            console.log(res);
            if(res.data.verdict == 1){
                setStatus('OK');
            }else{
                setStatus('NOT OK');
            }
        })
    }   

    return(
        <div>
            <div id="problem">
                You are given a number n. Write a program to find the sum: 1 + 2 + 3 + ... + n.
            </div>
            <br/>
            <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages.js)}
                padding={10}
                tabSize={4}
                style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                height: '500px',
                border: '1px solid black'
            }}
      />
            <button onClick={handleClick}>Submit</button>
            <div>{status}</div>
        </div>
    )
}