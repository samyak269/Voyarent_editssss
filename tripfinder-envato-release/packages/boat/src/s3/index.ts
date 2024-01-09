import { BUCKET_NAME, BUCKET_REGION } from '@/config/s3'
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
    region: BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!
    }
})

export const getObjectURL = async (key: string) => {
    const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key
    })
    const url = await getSignedUrl(s3Client, command)

    return url
}

export const putObjectURL = async (fileName: string, contentType: string) => {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `uploads/listings/${fileName}`,
        ContentType: contentType
    })
    const url = await getSignedUrl(s3Client, command)
    return url
}