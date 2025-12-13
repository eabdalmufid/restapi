import { ApiScanner } from '@/lib/scanner';
import { NextResponse } from 'next/server';
import { join } from 'path';

const scanner = new ApiScanner(join(process.cwd(), 'pages/api'));
export async function HEAD(req: Request) {
    const { searchParams } = new URL(req.url);
    const feature = searchParams.get('feature');
    const category = searchParams.get('category');

    if (feature) {
        return new NextResponse(null, {
            status: scanner.hasFeature(feature) ? 200 : 404,
            headers: {
                'Powered-By': 'Seaavey APIs',
            },
        });
    }

    if (category) {
        const features = scanner.getFeatures(category);
        return new NextResponse(null, {
            status: features.length ? 200 : 404,
            headers: {
                'Powered-By': 'Seaavey APIs',
            },
        });
    }

    return new NextResponse(null, {
        status: 200,
        headers: {
            'Powered-By': 'Seaavey APIs',
        },
    });
}
