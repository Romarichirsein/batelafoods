import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Batela Foods — Saveurs du Cameroun';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params: { locale } }: { params: { locale: string } }) {
    const isEn = locale === 'en';
    const tagline = isEn ? 'FLAVORS OF CAMEROON' : 'SAVEURS DU CAMEROUN';
    const subtitle = isEn
        ? 'Premium Local Products Directly from Douala'
        : 'Produits Locaux Premium en Direct de Douala';

    return new ImageResponse(
        (
            <div
                style={{
                    background: '#0a0a0a',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '12px solid #ff003c',
                }}
            >
                {/* Neon Orbs */}
                <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255, 0, 60, 0.1)', filter: 'blur(80px)' }} />
                <div style={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(0, 255, 102, 0.1)', filter: 'blur(80px)' }} />

                {/* Brand */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 40 }}>
                    <div style={{ background: '#ff003c', width: 80, height: 80, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 0 40px rgba(255, 0, 60, 0.4)' }}>
                        <span style={{ color: 'white', fontSize: 48, fontWeight: 'black' }}>B</span>
                    </div>
                    <div style={{ display: 'flex', fontSize: 72, fontWeight: 900, letterSpacing: '-0.05em' }}>
                        <span style={{ color: 'white' }}>BATELA</span>
                        <span style={{ color: '#ff003c', marginLeft: 15 }}>FOODS</span>
                    </div>
                </div>

                {/* Tagline */}
                <div style={{ fontSize: 48, color: 'white', fontWeight: 700, textAlign: 'center', maxWidth: 800 }}>
                    {tagline}
                </div>

                {/* Footer */}
                <div style={{ position: 'absolute', bottom: 60, fontSize: 24, color: '#666', fontWeight: 500 }}>
                    batelafoods.cm • 🇨🇲 Made in Cameroon
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
