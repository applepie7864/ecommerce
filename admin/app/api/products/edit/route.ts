import { mongooseConnect } from '@/lib/mongoose'
import ProductModel from '@/models/product'
import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
    await mongooseConnect();
    const { id, title, description, price, images } = await req.json();
    await ProductModel.updateOne(
        {_id: id}, 
        { title, description, price, images }
    )
    const res = {
        status: HttpStatusCode.Created
    }
    return NextResponse.json(res);
}