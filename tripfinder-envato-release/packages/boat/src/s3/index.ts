import { BUCKET_NAME, BUCKET_REGION } from '@/config/s3'
import { GetObjectCommand, PutObjectCommand, S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const s3Client = new S3Client({
    region: BUCKET_REGION,
    credentials: {
        accessKeyId: 'AKIAWZOXUVLRQH27XSVK',
        secretAccessKey: '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'
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

export async function listObjectsInDirectory(bucketName: string, directoryName: string) {
    
    try {

        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: directoryName
        });

        const ans = await s3Client.send(command)
        
        if (ans.Contents) return ans.Contents
        else return null

    } catch (err) {
        console.error("Error", err);
    }

}