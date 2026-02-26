"use client";

import axios from "axios";
import { API_URL } from "./api";

import { useEffect, useState } from "react";
import Link from "next/link";

import Layout from "./pages/layout/page";

export default function Home() {
  type books = {
    id: number;
    title: string;
    desc: string;
    price: number;
    cover: string;
  }
  const [books, setBooks] = useState<books[]>([]);
  const handleDelete = async(id: number) => {
    try {
      await axios.delete(`${API_URL}/books/${id}`)
      window.location.reload()
    } catch(err){ console.log(err) }
  }

  useEffect(() => {
    const fetchBooks = async() => {
      try {
        const res = await axios.get(`${API_URL}/books`);
        setBooks(res.data);
      } catch(err){
        console.log(err);
      }
    };
    
    fetchBooks();
  }, []);

  return (
      <Layout>
        <section
          className="
            min-h-screen
            flex flex-col
            items-center justify-center
            text-[calc(10px+2vmin)]
          ">

          <div className="grid grid-cols-3">
            
          {books.map((book) => (
            <div key={book.id} className="flex flex-col items-center outline-1  rounded-xs m-2 p-2">
              {/* {book.cover && <img src={book.cover} alt="" />} */}
              <div>
                <h2>{book.title}</h2>
                <p>{book.desc}</p>
                <p>{book.price}</p>
              </div>

              <div className="flex w-full justify-between">
                <Link href={`/pages/update/${book.id}`} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition cursor-pointer">Update</Link>
                <button onClick={() => handleDelete(book.id)} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition cursor-pointer">Delete</button>
              </div>
            </div>
          ))}
          </div>

          <Link href="/pages/add">Add new book</Link>
        </section>
      </Layout>
    );
}
