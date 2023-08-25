'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Tilt from 'react-parallax-tilt';

export default function Page() {
  const handle = useFullScreenHandle();
  const [selectedImage, setSelectedImage] = useState<string>();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.currentTarget.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <FullScreen handle={handle}>
      <div
        className="w-full h-screen px-6 flex flex-col items-center justify-center"
        style={{
          background: 'radial-gradient(rgb(23 23 23), rgb(10 10 10));',
        }}
      >
        {!handle.active && (
          <button
            onClick={handle.enter}
            className="absolute top-0 right-0 m-4 p-2 bg-neutral-800 text-neutral-100 rounded-md"
          >
            Enter fullscreen
          </button>
        )}

        <div
          style={{
            filter: 'drop-shadow(rgba(240, 230, 255, 0.08) 0px 48px 100px)',
          }}
          className="w-full"
        >
          <Tilt
            gyroscope={true}
            tiltMaxAngleX={15}
            tiltMaxAngleY={20}
            className="w-full max-w-md"
          >
            <div
              className="bg-neutral-200 rounded-[1px] px-4 pt-4 pb-[90px] w-full aspect-[0.833]"
              style={{
                backgroundColor: 'rgb(229, 229, 229)',
                opacity: 1,
                backgroundImage:
                  'linear-gradient(135deg, rgb(225 225 225) 25%, transparent 25%), linear-gradient(225deg, rgb(225 225 225) 25%, transparent 25%), linear-gradient(45deg, rgb(225 225 225) 25%, transparent 25%), linear-gradient(315deg, rgb(225 225 225) 25%, rgb(229 229 229) 25%)',
                backgroundPosition: '3px 0, 3px 0, 0 0, 0 0',
                backgroundSize: '6px 6px',
                backgroundRepeat: 'repeat',
              }}
            >
              <div className="w-full h-full bg-neutral-800 relative">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt=""
                    fill
                    className="w-full h-full object-cover"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset',
                    }}
                  />
                ) : (
                  <label
                    htmlFor="image-input"
                    className="cursor-pointer w-full h-full grid place-items-center"
                  >
                    Click to select an image
                  </label>
                )}
                <input
                  type="file"
                  id="image-input"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </Tilt>
        </div>

        <ul className="px-6 py-10 text-neutral-700 text-left w-full">
          <li className="flex gap-1 items-center" contentEditable>
            Paris
          </li>
          <li className="flex gap-1 items-center" contentEditable>
            1.200 km
          </li>
        </ul>
      </div>
    </FullScreen>
  );
}
