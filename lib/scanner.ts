import { readdirSync, Dirent, existsSync, readFileSync } from 'fs';
import { join, relative } from 'path';

type FeatureInfo = {
    path: string;
    queryParams: string[];
};

type ScanResult = Record<string, FeatureInfo[]>;

export class ApiScanner {
    private rootDir: string;

    constructor(rootDir: string) {
        this.rootDir = rootDir;
    }

    /** 🔹 Ambil query params dari isi file */
    private extractQueryParams(filePath: string): string[] {
        const code = readFileSync(filePath, 'utf-8');
        const params = new Set<string>();

        // const { a, b } = req.query
        const destructuring = code.match(/const\s*{\s*([^}]+)\s*}\s*=\s*req\.query/g) || [];

        for (const block of destructuring) {
            const vars = block
                .replace(/const|{|}|=|req\.query/g, '')
                .split(',')
                .map(v => v.trim())
                .filter(Boolean);

            vars.forEach(v => params.add(v));
        }

        // req.query.xxx
        const direct = code.match(/req\.query\.([a-zA-Z0-9_]+)/g) || [];
        direct.forEach(m => params.add(m.replace('req.query.', '')));

        return Array.from(params);
    }

    /** 🔹 Recursive reader */
    private readRecursive(base: string, current: string = base): FeatureInfo[] {
        const entries: Dirent[] = readdirSync(current, { withFileTypes: true });
        const result: FeatureInfo[] = [];

        for (const entry of entries) {
            const fullPath = join(current, entry.name);

            if (entry.isDirectory()) {
                result.push(...this.readRecursive(base, fullPath));
            }

            if (entry.isFile()) {
                const path = relative(base, fullPath)
                    .replace(/\.(ts|js)$/, '')
                    .replace(/\/index$/, '');

                result.push({
                    path,
                    queryParams: this.extractQueryParams(fullPath),
                });
            }
        }

        return result;
    }

    /** 🔹 Ambil semua category */
    public getCategories(): string[] {
        return readdirSync(this.rootDir, { withFileTypes: true })
            .filter(d => d.isDirectory() && !d.name.startsWith('_'))
            .map(d => d.name);
    }

    /** 🔹 Ambil semua feature dalam satu category */
    public getFeatures(category: string): FeatureInfo[] {
        const categoryPath = join(this.rootDir, category);
        if (!existsSync(categoryPath)) return [];

        return this.readRecursive(categoryPath);
    }

    /** 🔹 Cari feature */
    public findFeature(feature: string): { category: string; feature: FeatureInfo } | null {
        for (const category of this.getCategories()) {
            const features = this.getFeatures(category);

            for (const f of features) {
                if (f.path === feature || f.path.endsWith(`/${feature}`)) {
                    return { category, feature: f };
                }
            }
        }
        return null;
    }

    /** 🔹 Check feature exist */
    public hasFeature(feature: string): boolean {
        return this.getCategories().some(cat =>
            this.getFeatures(cat).some(f => f.path === feature || f.path.endsWith(`/${feature}`)),
        );
    }

    /** 🔹 Full scan */
    public scanAll(): ScanResult {
        const data: ScanResult = {};

        for (const cat of this.getCategories()) {
            data[cat] = this.getFeatures(cat);
        }

        return data;
    }
}
