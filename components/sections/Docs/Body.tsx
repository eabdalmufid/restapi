'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import toast from 'react-hot-toast';

export default function DocsBody() {
    return (
        <div className="flex flex-1 flex-col">
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>Card Content</CardContent>
                <CardFooter>Card Footer</CardFooter>
            </Card>
            <div onClick={() => toast.success('test')}>Anjay</div>
        </div>
    );
}
