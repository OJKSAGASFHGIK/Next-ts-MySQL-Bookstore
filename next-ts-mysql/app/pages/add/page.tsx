"use client";   
import axios from "axios";
import { API_URL } from "../../api";

import { useState } from "react"
import { useRouter } from "next/navigation";

import Layout from "../layout/page";

export default function add(){
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: ""
    });

    // console.log(book); // to verify handleChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const navigate = useRouter();
    const handleClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        try {
            await axios.post(`${API_URL}/books`, book)
            navigate.push("/");
        } catch(err){ console.log(err) }
    }
    return(<Layout>
        <div className="form">
            <h1>Add Book</h1>
            <input name="title" type="text" onChange={handleChange} placeholder="title" />
            <input name="desc" type="text" onChange={handleChange} placeholder="description" />
            <input name="price" type="number" onChange={handleChange} placeholder="price" />
            {/* <input name="cover" type="text" onChange={handleChange} placeholder="cover" /> */}
            <button className="cursor-pointer" onClick={handleClick}>Add</button>
        </div>
    </Layout>)
}