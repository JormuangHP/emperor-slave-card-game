import { ImageResponse } from 'next/og';

// 路由段配置
export const runtime = 'edge';

// 图片元数据
export const alt = '皇帝与奴隶卡牌对战游戏';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// 图片生成
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom, #ff8c00, #ffbb52)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '40px',
          gap: '30px'
        }}>
          <div style={{
            background: '#ffde59',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            transform: 'rotate(-5deg)',
            border: '10px solid white'
          }}>
            👑
          </div>
          <div style={{
            background: '#4a6cff',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            transform: 'rotate(5deg)',
            border: '10px solid white'
          }}>
            ⛓️
          </div>
        </div>
        <h1 style={{
          fontWeight: 800,
          fontSize: '80px',
          margin: '0',
          textShadow: '0 5px 10px rgba(0,0,0,0.2)'
        }}>
          皇帝与奴隶
        </h1>
        <p style={{
          fontWeight: 600,
          fontSize: '40px',
          opacity: 0.8,
          margin: '10px 0'
        }}>
          卡牌对战游戏
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
