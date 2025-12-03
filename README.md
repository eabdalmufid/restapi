/
├── app/
│ ├── (public)/ # Halaman publik (landing, login, register)
│ │ └── login/
│ │ └── page.tsx
│ ├── (dashboard)/ # Halaman private (setelah login)
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── api/ # Route API Next.js
│ │ └── auth/
│ │ └── route.ts
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Homepage
│ ├── global-error.tsx # Error fallback
│ └── loading.tsx # Loading global
│
├── components/
│ ├── ui/ # Komponen shadcn yang di-generate
│ ├── common/ # Komponen umum (Navbar, Footer)
│ ├── forms/ # Komponen form
│ └── layout/ # Komponen layout kecil
│
├── lib/
│ ├── utils.ts # Helper function
│ ├── auth.ts # Authentication logic
│ ├── db.ts # Prisma / DB connector
│ ├── validators/ # Zod schemas
│ └── services/ # Service layer untuk API calls / business logic
│
├── hooks/
│ └── useUser.ts # Custom hooks
│
├── store/
│ └── user.store.ts # Zustand / Jotai state management
│
├── styles/
│ ├── globals.css
│ └── variables.css
│
├── public/
│ ├── images/
│ ├── icons/
│ └── favicon.ico
│
├── config/
│ ├── site.ts # Config judul / info website
│ ├── env.ts # Zod environment parser
│ └── api.ts # Base URL API dsb.
│
├── types/
│ ├── next.d.ts # Type augmentation
│ └── index.ts # Global TS types
│
├── prisma/
│ └── schema.prisma
│
├── scripts/
│ └── seed.ts # Script seeding database
│
├── .env
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
