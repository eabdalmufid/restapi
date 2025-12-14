'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Feature } from '@/types/APISchema';
import { ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import ApiTestDialog from './Dialog';

const methodColor = (method: string) => {
    switch (method) {
        case 'GET':
            return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
        case 'POST':
            return 'bg-sky-500/10 text-sky-600 dark:text-sky-400';
        case 'PUT':
            return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
        case 'PATCH':
            return 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
        case 'DELETE':
            return 'bg-rose-500/10 text-rose-600 dark:text-rose-400';
        default:
            return 'bg-muted text-muted-foreground';
    }
};

export default function DocsBody({ data, category }: { data: Feature; category: string }) {
    const fullPath = `${process.env.NEXT_PUBLIC_API_URL}/api/${category}${data.path}`;
    return (
        <div className="mx-auto w-full max-w-4xl space-y-10 p-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">{data.key}</h1>
                {data.summary && <p className="text-muted-foreground text-lg">{data.summary}</p>}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex flex-wrap items-center gap-2">
                        {data.method.map(method => (
                            <Badge key={method} className={methodColor(method)}>
                                {method}
                            </Badge>
                        ))}
                        <span className="text-muted-foreground font-mono text-sm">{fullPath}</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto"
                            onClick={() => {
                                navigator.clipboard.writeText(fullPath);
                                toast.success('Copied to clipboard');
                            }}
                        >
                            Copy
                        </Button>
                        <ApiTestDialog feature={data} category={category} />
                    </CardTitle>
                    <CardDescription>Endpoint</CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Query Parameters</CardTitle>
                    <CardDescription>Parameters passed via query string</CardDescription>
                </CardHeader>
                <CardContent>
                    {data.queryParameters?.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Required</TableHead>
                                    <TableHead>Default</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.queryParameters.map(param => (
                                    <TableRow key={param.name}>
                                        <TableCell className="font-mono">{param.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{param.type}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            {param.required ? (
                                                <Badge variant="destructive">Yes</Badge>
                                            ) : (
                                                'No'
                                            )}
                                        </TableCell>
                                        <TableCell className="font-mono">
                                            {param.default !== undefined
                                                ? String(param.default)
                                                : '-'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-muted-foreground text-sm">No query parameters</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Responses</CardTitle>
                    <CardDescription>Response schema by status code</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {Object.entries(data.responses).map(([status, schema]) => (
                        <Collapsible key={status}>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" className="flex w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary">{status}</Badge>
                                        <span className="text-muted-foreground text-sm">
                                            Response Body
                                        </span>
                                    </div>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <Separator className="my-3" />
                                <pre className="bg-muted overflow-x-auto rounded-md p-4 text-sm">
                                    {JSON.stringify(schema, null, 2)}
                                </pre>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
