import { ImageResponse } from 'next/og';

export const contentType = 'image/png';
export const dynamic = 'error';

export const size = {
  width: 32,
  height: 32
};

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'red',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
        🦺
      </div>
    ),
    { ...size }
  );
}
