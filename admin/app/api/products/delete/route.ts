import { ProductType } from '@/app/types'
import { mongooseConnect } from '@/lib/mongoose'
import ProductModel from '@/models/product'
import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
    await mongooseConnect();
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
        try {
            const product = await ProductModel.deleteOne({_id: id})
            const res = {
                data: "Succesfully deleted.",
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

    const res = {
        data: "Product ID not specified.",
        status: HttpStatusCode.BadRequest
    }
    return NextResponse.json(res)
}