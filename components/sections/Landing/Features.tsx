'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Zap, Shield, Code, Database, GitBranch } from 'lucide-react';

const features = [
    {
        icon: <Code className="h-6 w-6" />,
        title: 'RESTful Design',
        description: 'Clean, intuitive endpoints following REST principles for easy integration',
        badge: 'Standard',
    },
    {
        icon: <Zap className="h-6 w-6" />,
        title: 'High Performance',
        description: 'Optimized API endpoints for maximum performance and minimal response time',
        badge: 'Fast',
    },
    {
        icon: <Shield className="h-6 w-6" />,
        title: 'Secure Access',
        description: 'Secure by design with authentication and encryption for all requests',
        badge: 'Secure',
    },
    {
        icon: <Database className="h-6 w-6" />,
        title: 'Reliable Storage',
        description: 'Persistent and reliable data storage with high availability',
        badge: 'Reliable',
    },
    {
        icon: <Globe className="h-6 w-6" />,
        title: 'Global Access',
        description: 'Accessible from anywhere with optimized response times',
        badge: 'Global',
    },
    {
        icon: <GitBranch className="h-6 w-6" />,
        title: 'Open Source',
        description: 'Completely open source with transparent development and community support',
        badge: 'FOSS',
    },
];

export default function Features() {
    return (
        <section className="bg-background/50 py-20" id="features">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                        Powerful API Features
                    </h2>
                    <p className="text-foreground/80 mx-auto max-w-2xl text-lg">
                        Our open-source REST API provides everything you need for efficient
                        integration
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="border-border/30 hover:border-primary/50 bg-card/30 transition-all duration-300 hover:shadow-lg"
                        >
                            <CardHeader>
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </div>
                                <Badge
                                    variant="secondary"
                                    className="bg-primary/10 text-primary hover:bg-primary/15 w-fit"
                                >
                                    {feature.badge}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground/70">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
