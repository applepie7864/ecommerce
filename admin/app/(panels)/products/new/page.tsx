"use client";
import { use, useState } from "react"
import axios from "axios"
import { ProductType
 } from "@/app/types";
import { useRouter } from "next/navigation";

export default function NewProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priceAsString, setPrice] = useState("");
    const [imageLinks, setImageLinks] = useState<string[]>([]);
    const [back, setBack] = useState(false);

    async function createProduct(e: any) {
        e.preventDefault()
        const price: number = +priceAsString;
        const data: ProductType = { title, description, price, images: imageLinks }
        await axios.post("/api/products/create", data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        setBack(true);
    }

    async function uploadImages(e: any) {
        const images = e.target?.files;
        if (images?.length > 0) {
            const data = new FormData();
            for (const image of images) {
                data.append('image', image)
            }
            const res = await axios.post('/api/upload', data)
            const links = [...imageLinks, ...res.data]
            setImageLinks(links)
        }
    }

    if (back) {
        const router = useRouter();
        router.push("/products");
    }

    return (
        <form onSubmit={(e) => createProduct(e)}>
            new product
            <input 
                type="text" 
                placeholder="name" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
            />
            <textarea 
                placeholder="description"
                value={description} 
                onChange={e => setDescription(e.target.value)}
            />
            <div>
                <div>Upload</div>
                <input type="file" multiple onChange={e => uploadImages(e)} accept="image/png, image/jpg, image/jpeg" />
            </div>
            { imageLinks?.length ? (imageLinks.map(imageLink => (
                <div key={imageLink}>
                    <img src={imageLink} />
                </div>
            ))) : (
                <div>no images</div>
            )}
            <input 
                type="number" 
                placeholder="$"
                value={priceAsString} 
                onChange={e => setPrice(e.target.value)}
            />
            <button type="submit" className="w-1/2">Save</button>
        </form>
    )
}
