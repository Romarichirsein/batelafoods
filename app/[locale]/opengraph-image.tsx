import { ImageResponse } from 'next/og';

export function generateStaticParams() {
    return [{ locale: 'fr' }, { locale: 'en' }];
}

export const alt = 'Batela Foods — Saveurs du Cameroun';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params: { locale } }: { params: { locale: string } }) {
    const isEn = locale === 'en';
    const tagline = isEn ? 'FLAVORS OF CAMEROON' : 'SAVEURS DU CAMEROUN';

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
                    border: '12px solid #ff003c',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', fontSize: 80, fontWeight: 900, color: 'white' }}>
                        <span>BATELA</span>
                        <span style={{ color: '#ff003c', marginLeft: 15 }}>FOODS</span>
                    </div>
                    <div style={{ fontSize: 40, color: '#ff003c', fontWeight: 700, marginTop: 20 }}>
                        {tagline}
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
