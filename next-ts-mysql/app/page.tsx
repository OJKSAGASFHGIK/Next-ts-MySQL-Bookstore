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
        <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Book Store</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book) => (
                <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  {/* {book.cover && <img src={book.cover} alt="" className="w-full h-48 object-cover" />} */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h2>
                    <p className="text-gray-600 mb-4 flex-1">{book.desc}</p>
                    <p className="text-xl font-semibold text-indigo-600 mb-6">${book.price}</p>
                    
                    <div className="flex gap-4 mt-auto">
                      <Link href={`/pages/update/${book.id}`} className="flex-1 text-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition font-medium">
                        Update
                      </Link>
                      <button onClick={() => handleDelete(book.id)} className="flex-1 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition font-medium">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="/pages/add" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add New Book
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
}
