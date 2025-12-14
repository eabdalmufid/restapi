import { ApiSchema } from '@/types/APISchema';
import { readFileSync } from 'fs';
import { NextResponse } from 'next/server';
import { join } from 'path';

export async function GET(_req: Request, props: { params: Promise<{ feature: string }> }) {
    const { feature } = await props.params;

    const filePath = join(process.cwd(), 'endpoints.json');

    let schema: ApiSchema;

    try {
        schema = JSON.parse(readFileSync(filePath, 'utf-8')) as ApiSchema;
    } catch {
        return NextResponse.json(
            { ok: false, message: 'Failed to load endpoints schema' },
            { status: 500 },
        );
    }

    const service = schema.services.find(s => s.features.some(f => f.key === feature));

    if (!service) {
        return NextResponse.json({ ok: false, message: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json(
        {
            ok: true,
            data: service,
        },
        {
            status: 200,
            headers: {
                'Powered-By': 'Seaavey APIs',
            },
        },
    );
}
