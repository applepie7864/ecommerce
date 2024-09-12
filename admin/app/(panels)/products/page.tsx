"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { set } from "mongoose";

interface ReturnedProducts {
    "_id": string;
    "title": string;
    "description": string;
    "price": number;
    "images": string[];
    "__v": number;
}

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ReturnedProducts[]>([]);
  useEffect(() => {
    axios
      .get("/api/products")
      .then(response => {
        setProducts(response.data.data)
        setLoading(false);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if (loading) {
    return (
      <div>
        products Loading...
      </div>
    )
  }

  return (
    <div>
      products
      {products.map(product => (
        <div key={product._id}>
          <div>{product.title}</div>
          <div>{product.description}</div>
          <div>{product.price}</div>
          <Link href={'/products/edit/' + product._id}>Edit</Link>
          <Link href={'/products/delete/' + product._id}>Delete</Link>
        </div>
      ))}
      <Link href='/products/new'>New Product</Link>
    </div>
  )
}
