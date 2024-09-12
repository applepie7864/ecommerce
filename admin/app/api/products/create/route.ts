import { ProductType } from '@/app/types'
import { mongooseConnect } from '@/lib/mongoose'
import ProductModel from '@/models/product'
import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    await mongooseConnect();
    const { title, description, price, images }: ProductType = await req.json();
    const newProduct = await ProductModel.create({ title, description, price, images })
    const res = {
        data: newProduct,
        status: HttpStatusCode.Created
    }
    return NextResponse.json(res)
}