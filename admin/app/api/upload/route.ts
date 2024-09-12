import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp"
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const images = formData.getAll('image') as unknown as File[] | null;
    if (!images) {
        return NextResponse.json(null, { status: HttpStatusCode.BadRequest })
    }
    const links: string[] = [];
    for (const image of images) {
        const buffer = Buffer.from(await image.arrayBuffer())
        const edited = await sharp(buffer).resize({ height: 256, width: 256, fit: 'cover' }).toFormat('jpg').toBuffer()
        const type = image.type;
        const key = Date.now() + '.jpg';
        
        const s3 = new S3Client({
            region: process.env.S3_BUCKET_REGION ?? "",
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY ?? "",
                secretAccessKey: process.env.S3_SECRET_KEY ?? ""
            }
        })

        await s3.send(new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME ?? "",
            Key: key,
            Body: edited,
            ACL: 'public-read',
            ContentType: type
        }))
        const link: string = "https://" + process.env.S3_BUCKET_NAME + ".s3." + process.env.S3_BUCKET_REGION + ".amazonaws.com/" + key;
        links.push(link);
    }
    return NextResponse.json(links, { status: HttpStatusCode.Ok })
}

export const config =  {
    api: { bodyParser: false }
}