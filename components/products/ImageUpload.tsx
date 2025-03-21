"use client"
import { CldUploadWidget } from "next-cloudinary"
import { useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"
import Image from "next/image"
import { getImagePath } from "@/src/utils"

export default function ImageUpload({ image }: { image: string | undefined }) {

  const [imageUrl, setImageUrl] = useState('')

  return (
    <CldUploadWidget
      onSuccess={(result, { widget }) => {
        if (result.event === 'success') {
          widget.close()
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          setImageUrl(result.info?.secure_url)
        }
      }}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label className="text-slate-800"></label>
            <div className="relative cursor-pointer hover:opacity-50 transition p-10
            border-neutral-300 flex flex-col justify-center items-center gap-4
            text-neutral-600 bg-slate-200" onClick={() => open()}>
              <TbPhotoPlus
                size={50}
              />
              <p className="text-lg font-semibold">Agregar Imagen</p>
            </div>

          </div>
          {imageUrl && (
            <div className="space-y-2">
              <label htmlFor="">
                <div className="relative w-64 h-64">
                  <Image
                    fill
                    src={imageUrl}
                    alt="imagen del producto"
                  />
                </div>
              </label>
            </div>
          )}

          {image && !imageUrl && (
            <div className="space-y-2">
              <label htmlFor="">
                <div className="relative w-64 h-64">
                  <Image
                    fill
                    src={getImagePath(image)}
                    alt="imagen del producto"
                  />
                </div>
              </label>
            </div>
          )}

          <input
            type="hidden"
            name='image'
            value={imageUrl ? imageUrl : image}
            style={{ objectFit: 'contain' }}
          />
        </>
      )}
    </CldUploadWidget>
  )
}
