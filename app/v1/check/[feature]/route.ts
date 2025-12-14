import { ApiSchema } from '@/types/APISchema';
import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, props: { params: Promise<{ feature: string }> }) {
    const { feature } = await props.params;

    const filePath = join(process.cwd(), 'endpoints.json');

    let schema: ApiSchema;

    // Load schema
    try {
        schema = JSON.parse(readFileSync(filePath, 'utf-8')) as ApiSchema;
    } catch {
        return NextResponse.json(
            {
                ok: false,
                message: 'Failed to load endpoints schema',
            },
            { status: 500 },
        );
    }

    // Find feature by key (flatten all services)
    const featureData = schema.services
        .flatMap(service => service.features)
        .find(f => f.key === feature);

    if (!featureData) {
        return NextResponse.json(
            {
                ok: false,
                message: 'Feature not found',
            },
            { status: 404 },
        );
    }

    return NextResponse.json(
        {
            ok: true,
            data: featureData,
        },
        {
            status: 200,
            headers: {
                'Powered-By': 'Seaavey APIs',
            },
        },
    );
}
