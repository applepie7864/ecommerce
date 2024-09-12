"use client";
import axios from "axios";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function DeleteProduct({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [productTitle, setProductTitle] = useState("")
    const id = params.id;

    useEffect(() => {
        axios
            .get("/api/products?id=" + id)
            .then(res => {
                if (res.data.status == 200) {
                    setProductTitle(res.data.data.title);
                } else {
                    router.push("/products")
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [id])

    function back() {
        router.push("/products");
    }

    async function deleteProduct() {
        await axios.delete("/api/products/delete?id=" + id);
        back();
    }

    return (
        <div>
        Are you sure you want to delete { productTitle }?
        <button onClick={() => deleteProduct()}>yes</button>
        <button onClick={() => back()}>no</button>
        </div>
    )
}
