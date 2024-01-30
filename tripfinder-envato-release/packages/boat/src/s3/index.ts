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

export async function listImagesInDirectory(directory: string) {
    try {
        const data = await s3Client.send(new ListObjectsV2Command({
            Bucket: 'voyarentboats',
            Prefix: directory,
        }));

        const imageUrls: string[] = []

        if (data.Contents) {

            for (let imageUrl of data.Contents) {
                imageUrls.push(`https://voyarentboats.s3.eu-central-1.amazonaws.com/${imageUrl.Key}`)
            }
        }

        return imageUrls
    } catch (err) {
        console.error("Error", err);
    }
}

// {
//   '$metadata': {
//     httpStatusCode: 200,
//     requestId: 'FVRB8DVNQ158CHZA',
//     extendedRequestId: 'cC0Hz9OzPZKNrd2nJ9U+VP87Np+zBqqvAAp2SM56EsBh6tDmRoNPzJ9EwK56IsZZGyO1eiwZTT88qx0r6oYJ+Q==',
//     cfId: undefined,
//     attempts: 1,
//     totalRetryDelay: 0
//   },
//   Contents: [
//     {
//       Key: '/10001/15949713170__450x250.jpg',
//       LastModified: 2024-01-20T07:09:16.000Z,
//       ETag: '"0cd2ca83c656838b602c7667d0209c48"',
//       Size: 24,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/15990281080_.jpg',
//       LastModified: 2024-01-20T07:09:28.000Z,
//       ETag: '"b4d2a9176799831d9b120a969843b3ee"',
//       Size: 16,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/15990281080__1349x402.jpg',
//       LastModified: 2024-01-20T07:09:12.000Z,
//       ETag: '"b01aa4bd548b5052d2ddb5523807103f"',
//       Size: 25,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/15990281080__1440x960.jpg',
//       LastModified: 2024-01-20T07:09:16.000Z,
//       ETag: '"63028b20072d01bc081212d8258850da"',
//       Size: 25,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/15990281080__450x250.jpg',
//       LastModified: 2024-01-20T07:15:48.000Z,
//       ETag: '"7dc1dcd65740f6c370ddfda279828544"',
//       Size: 24,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/15990281091_.jpg',
//       LastModified: 2024-01-20T07:09:26.000Z,
//       ETag: '"37ecc460b46d88bc504c97197809797b"',
//       Size: 16,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/15990281091__1349x402.jpg',
//       LastModified: 2024-01-20T07:09:11.000Z,
//       ETag: '"740bcc97e8081c98ce9c3339bf9c36e1"',
//       Size: 25,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/15990281091__1440x960.jpg',
//       LastModified: 2024-01-20T07:09:20.000Z,
//       ETag: '"7d85d1ca6838b44691e4bb4f2ea45584"',
//       Size: 25,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/15990281091__450x250.jpg',
//       LastModified: 2024-01-20T07:09:12.000Z,
//       ETag: '"a7f89d7ed69cc6ff17806817a5266d4c"',
//       Size: 24,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/15990291920_.jpg',
//       LastModified: 2024-01-20T07:09:13.000Z,
//       ETag: '"1e49988ce4ddeac1373da83b77e92899"',
//       Size: 16,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/15990291920__1349x402.jpg',
//       LastModified: 2024-01-20T07:09:12.000Z,
//       ETag: '"69a3d2517cfe2abe58307558433c3c47"',
//       Size: 25,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/15990291920__1440x960.jpg',
//       LastModified: 2024-01-20T07:15:48.000Z,
//       ETag: '"6683df90ab1a00b7382d9814b00f2d8e"',
//       Size: 25,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/15990291920__450x250.jpg',
//       LastModified: 2024-01-20T07:09:11.000Z,
//       ETag: '"b722a7a8f452ba537f69780d3929fec8"',
//       Size: 24,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/16049343260_.jpg',
//       LastModified: 2024-01-20T07:09:13.000Z,
//       ETag: '"63a0a96b8ece0abc7b2fa5cea75aa647"',
//       Size: 16,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/16049343260__1349x402.jpg',
//       LastModified: 2024-01-20T07:09:16.000Z,
//       ETag: '"387c4bf5c3821eb80d3b7ee462244e13"',
//       Size: 25,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/16049343260__1440x960.jpg',
//       LastModified: 2024-01-20T07:09:14.000Z,
//       ETag: '"96d54384ea7035e16ff152d7750b21fa"',
//       Size: 25,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/16049343260__450x250.jpg',
//       LastModified: 2024-01-20T07:09:12.000Z,
//       ETag: '"8558c3f2d7c49b986340880dbe6cef5f"',
//       Size: 24,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/16049343261_.png',
//       LastModified: 2024-01-20T07:09:12.000Z,
//       ETag: '"68998f61ebf2706519071dc35c16e640"',
//       Size: 16,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/16049343261__1349x402.png',
//       LastModified: 2024-01-20T07:15:51.000Z,
//       ETag: '"663dadfcf7fd72ae8caaed4aeac68942"',
//       Size: 25,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/16049343261__1440x960.png',
//       LastModified: 2024-01-20T07:09:16.000Z,
//       ETag: '"5fadc170222df7a707be4901b69a520b"',
//       Size: 25,
//       StorageClass: 'STANDARD'
//     },
//     {
//       Key: '/10001/16049343261__450x250.png',
//       LastModified: 2024-01-20T07:09:11.000Z,
//       ETag: '"19c2740bec1e61451f26c9f3931f35ad"',
//       Size: 24,
//       StorageClass: 'STANDARD'
//     }
//   ],
//   IsTruncated: false,
//   KeyCount: 21,
//   MaxKeys: 1000,
//   Name: 'voyarentboats',
//   Prefix: '/10001'
// }