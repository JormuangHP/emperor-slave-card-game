import { ImageResponse } from 'next/og';

// 路由段配置
export const runtime = 'edge';

// 图片元数据
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// 图片生成
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'orange',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '50%',
        }}
      >
        🃏
      </div>
    ),
    {
      ...size,
    }
  );
}
