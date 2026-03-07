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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New Book</h1>
                <div className="flex flex-col gap-4">
                    <input className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" name="title" type="text" onChange={handleChange} placeholder="Title" />
                    <input className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" name="desc" type="text" onChange={handleChange} placeholder="Description" />
                    <input className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" name="price" type="number" onChange={handleChange} placeholder="Price" />
                    {/* <input name="cover" type="text" onChange={handleChange} placeholder="cover" /> */}
                    <button className="w-full py-3 mt-4 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-200" onClick={handleClick}>Add Book</button>
                </div>
            </div>
        </div>
    </Layout>)
}