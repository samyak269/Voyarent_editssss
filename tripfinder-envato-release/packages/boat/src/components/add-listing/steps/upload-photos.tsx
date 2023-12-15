'use client';

import { useAtom, useSetAtom } from 'jotai';
import UploadedPhotoPreview from '@/components/add-listing/uploaded-photo-preview';
import CreateListingFooter from '@/components/footer/create-listing-footer';
import { stepAtom, storeAtom } from '@/components/add-listing/add-listing';
import Text from '@/components/ui/typography/text';
import Upload from '@/components/ui/upload';
import { uuid } from 'uuidv4'
import { useState } from 'react';

let newImgArr: any = [];

export default function AddBoatPhotos() {
  const setStep = useSetAtom(stepAtom);
  const [store, setStore] = useAtom(storeAtom);
  const [uploadError, setUploadError] = useState<null | string>(null)
  function handleDropAccepted(e: any) {
    e.forEach((item: any) => {

      newImgArr.push({
        id: `upload-${URL.createObjectURL(item)}`,
        key: uuid(),
        file: item,
        img: URL.createObjectURL(item),
      });
    });
    console.log(e);

    setStore({ ...store, images: newImgArr });
  }

  return (
    <div className="w-full max-w-[448px] xl:max-w-[648px]">
      <form noValidate onSubmit={(e) => e.preventDefault()}>
        <Upload
          accept="img"
          label="Add some photos of your boat"
          onDropAccepted={handleDropAccepted}
          labelClassName="md:!text-2xl md:leading-7 mb-5 md:mb-6"
          iconClassName="w-12 h-16 md:w-20 md:h-20 !text-gray-dark"
          className="h-[262px] pb-9 pt-12 xl:h-[500px] xl:pb-14 xl:pt-32"
          text={
            <div className="flex h-full flex-col justify-between text-center">
              <div>
                <Text
                  tag="h3"
                  className="text-lg font-normal leading-6 text-gray-dark"
                >
                  Drag your photos here
                </Text>
                <Text className="mt-3 text-gray">Choose at least 1 photos</Text>
              </div>
              <Text className="text-gray underline">
                Upload from your device
              </Text>
            </div>
          }
        >
          {({ files, setFiles }) => (
            <div className="mt-3 grid grid-cols-2 gap-2 lg:gap-3">
              {files.map((file, index) => (
                <UploadedPhotoPreview
                  key={`uploaded-${index}`}
                  file={file}
                  onDelete={() => {
                    const updatedFiles = files.filter((_, i) => i !== index);
                    setFiles(updatedFiles);
                  }}
                />
              ))}
            </div>
          )}
        </Upload>
        <CreateListingFooter
          onBack={() => setStep(2)}
          onNext={() => {
            fetch('/api/s3/listings', {
              method: 'post',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify({
                // @ts-ignore
                fileNames: store.images.map((item) => item.key)
              })
            })
              .then(async (resp) => {
                if (resp.ok) {
                  return resp.json()
                } else {
                  const respBody = await resp.json()
                  setUploadError(respBody.error)
                }
              })
              .then((resp) => {
                console.log(resp);

                resp.url.map((singleURL: { key: string, url: string }) => {

                  store.images.map((image) => {
                    // @ts-ignore
                    if (image.key === singleURL.key) {
                      fetch(singleURL.url, {
                        method: 'put',
                        headers: {
                          // @ts-ignore
                          'Content-type': 'image/jpeg'
                        },
                        // @ts-ignore
                        body: image.file
                      })
                        .then((resp) => {
                          if (resp.ok) {
                            setStep(4)
                          } else {
                            setUploadError('Upload failed.')
                          }
                        })
                    } else {
                      setUploadError('Something went wrong.')
                    }
                  })
                })
              })
          }}
        />
      </form>
    </div>
  );
}