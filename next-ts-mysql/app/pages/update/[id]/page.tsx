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
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        placeholder="Book desc"
        name="desc"
        onChange={handleChange}
      />
      <input
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
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link href="/">See all books</Link>
    </div>
  </Layout>);
}
