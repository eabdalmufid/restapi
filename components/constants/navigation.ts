export interface INavigationItem {
    name: string;
    href?: string;
    children?: INavigationItem[];
}

export const Navigation: INavigationItem[] = [
    { name: 'Introduction', href: '/docs' },

    {
        name: 'Endpoints',
        children: [
            {
                name: 'Search',
                children: [{ name: 'Lyrics', href: '/docs/search/lyrics' }],
            },
        ],
    },
];
