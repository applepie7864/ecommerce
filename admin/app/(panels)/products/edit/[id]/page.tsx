"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { linkSync } from "fs";
import { ReactSortable } from "react-sortablejs";

export default function EditProduct({ params }: { params: { id: string } }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priceAsString, setPrice] = useState("");
    const [imageLinks, setImageLinks] = useState<string[]>([])
    const [back, setBack] = useState(false);
    const id = params.id;
    const router = useRouter();
    useEffect(() => {
        axios
            .get("/api/products?id=" + id)
            .then(res => {
                if (res.data.status == 200) {
                    setTitle(res.data.data.title);
                    setDescription(res.data.data.description);
                    setPrice(res.data.data.price + "");
                    setImageLinks(res.data.data.images);
                } else {
                    router.push("/products")
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [id])

    async function editProduct(e: any) {
        e.preventDefault()
        const price: number = +priceAsString;
        const data = { id, title, description, price, imageLinks }
        await axios.put("/api/products/edit", data, {
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
            console.log(links)
            setImageLinks(links)
            console.log(imageLinks)
        }
    }

    useEffect(() => {
        if (back) {
            router.push("/products");
        }
    }, [back])

    return (
        <div>
            <form onSubmit={(e) => editProduct(e)}>
                edit product page
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
                <button type="submit">Save</button>
            </form>
        </div>
    )
}