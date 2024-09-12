import { ProductType } from '@/app/types'
import { mongooseConnect } from '@/lib/mongoose'
import ProductModel from '@/models/product'
import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    await mongooseConnect();
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
        try {
            const product = await ProductModel.findById(id)
            const res = {
                data: product,
                status: HttpStatusCode.Ok
            }
            return NextResponse.json(res)
        } catch (err) {
            const res = {
                data: err,
                status: HttpStatusCode.BadRequest
            }
            return NextResponse.json(res)
        }
    }

    const products = await ProductModel.find();
    const res = {
        data: products,
        status: HttpStatusCode.Ok
    }
    return NextResponse.json(res)
}