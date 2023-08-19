import { ImageResponse } from 'next/server';





export const runtime = "edge"

export const alt = "phib.ro"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

const syne = fetch(new URL("/syne-variable.ttf", import.meta.url)).then((res) =>
  res.arrayBuffer()
)

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "black",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "end",
          justifyContent: "start",
        }}
      >
        phib.ro
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Syne",
          data: await syne,
          style: "normal",
          weight: 400,
        },
      ],
    }
  )
}
