import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0F172A',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #1E293B 2px, transparent 0), radial-gradient(circle at 75px 75px, #1E293B 2px, transparent 0)',
            backgroundSize: '100px 100px',
            position: 'relative',
          }}
        >
          {/* Background Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
            }}
          />
          
          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            {/* Logo/Icon */}
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#3B82F6',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  color: 'white',
                  fontSize: '40px',
                  fontWeight: 'bold',
                }}
              >
                {'</>'}
              </div>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: '#F8FAFC',
                textAlign: 'center',
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
            >
              CompileTime
            </h1>
            
            {/* Subtitle */}
            <p
              style={{
                fontSize: '28px',
                color: '#CBD5E1',
                textAlign: 'center',
                marginBottom: '40px',
                maxWidth: '600px',
              }}
            >
              Track coding activity and compete with developers worldwide
            </p>

            {/* Stats/Features */}
            <div
              style={{
                display: 'flex',
                gap: '40px',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                }}
              >
                <div
                  style={{
                    color: '#3B82F6',
                    fontSize: '24px',
                  }}
                >
                  🏆
                </div>
                <span
                  style={{
                    color: '#F8FAFC',
                    fontSize: '20px',
                    fontWeight: '600',
                  }}
                >
                  Daily Rankings
                </span>
              </div>
              
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: 'rgba(147, 51, 234, 0.1)',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: '1px solid rgba(147, 51, 234, 0.2)',
                }}
              >
                <div
                  style={{
                    color: '#9333EA',
                    fontSize: '24px',
                  }}
                >
                  ⚡
                </div>
                <span
                  style={{
                    color: '#F8FAFC',
                    fontSize: '20px',
                    fontWeight: '600',
                  }}
                >
                  Live Tracking
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                }}
              >
                <div
                  style={{
                    color: '#22C55E',
                    fontSize: '24px',
                  }}
                >
                  📊
                </div>
                <span
                  style={{
                    color: '#F8FAFC',
                    fontSize: '20px',
                    fontWeight: '600',
                  }}
                >
                  Multi-Language
                </span>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #3B82F6 0%, #9333EA 50%, #22C55E 100%)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    console.log(`${e instanceof Error ? e.message : 'Unknown error'}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
} 