'use client';

import { Badge } from '@/components/ui/badge';
import { Code, Zap, Lock, Globe } from 'lucide-react';

export default function About() {
    const values = [
        {
            icon: <Zap className="h-6 w-6" />,
            title: 'Performance',
            description: 'Optimized endpoints for maximum performance and minimal response time',
        },
        {
            icon: <Lock className="h-6 w-6" />,
            title: 'Security',
            description: 'Secure by design with authentication and encryption for all requests',
        },
        {
            icon: <Globe className="h-6 w-6" />,
            title: 'Accessibility',
            description: 'Simple and intuitive API endpoints accessible from anywhere',
        },
    ];

    return (
        <section className="bg-background py-20" id="about">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <Badge variant="secondary" className="bg-primary/10 text-primary mb-4">
                        About Our API
                    </Badge>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                        Open-Source REST API Platform
                    </h2>
                    <p className="text-foreground/80 mx-auto max-w-2xl text-lg">
                        A free and open-source REST API for developers to use in their projects,
                        built with modern technologies and best practices.
                    </p>
                </div>

                <div className="mb-16">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-card/30 border-border/30 hover:border-primary/50 rounded-xl border p-6 transition-all duration-300"
                            >
                                <div className="text-primary mb-4">{value.icon}</div>
                                <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                                <p className="text-foreground/70">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <div className="bg-primary/5 border-border/30 inline-flex items-center gap-2 rounded-full border px-6 py-3">
                        <Code className="h-4 w-4" />
                        <span className="text-foreground/80 text-sm">
                            Built for developers, by developers
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
