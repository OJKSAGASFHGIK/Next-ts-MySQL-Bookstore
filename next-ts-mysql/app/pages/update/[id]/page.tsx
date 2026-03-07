"use client";

import axios from "axios";
import { API_URL } from "../../../api";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Layout from "../../layout/page";

type Book = {
  title: string;
  desc: string;
  price: number | null;
  cover: string;
}

export default function BookUpdate( props: {params: Promise<{ id: string }>;} ){
  const { id } = use(props.params);

  const [book, setBook] = useState<Book>({
        title: "",
        desc: "",
        price: null,
        cover: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook((prev) => ({ 
      ...prev, 
      [name]: name === "price" ? (value === "" ? null : Number(value)) : value 
    }));
  };


  const [error, setError] = useState(false);
  const navigate = useRouter();
  const handleClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      
      try {
          await axios.put(`${API_URL}/books/${id}`, book)
          navigate.push("/");
      } catch(err){
        console.log(err);
        setError(true);
      }
  }

  return (<Layout>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Book</h1>
        <div className="flex flex-col gap-4">
          <input
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            type="text"
            placeholder="Book title"
            name="title"
            onChange={handleChange}
          />
          <textarea
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            rows={5}
            placeholder="Book description"
            name="desc"
            onChange={handleChange}
          />
          <input
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            type="number"
            placeholder="Book price"
            name="price"
            onChange={handleChange}
          />
          {/* <input
            type="text"
            placeholder="Book cover"
            name="cover"
            onChange={handleChange}
          /> */}
          <button 
            className="w-full py-3 mt-4 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
            onClick={handleClick}
          >
            Update
          </button>
          
          {error && <p className="text-red-500 text-center mt-2">Something went wrong!</p>}
          
          <Link href="/" className="block text-center mt-6 text-gray-500 hover:text-indigo-600 transition">
            See all books
          </Link>
        </div>
      </div>
    </div>
  </Layout>);
}
