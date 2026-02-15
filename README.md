# Inkwell

A personal reading tracker app built with React Native + Expo + Supabase.

## Features

- Track books you're reading, want to read, and have completed
- Rate and add notes to books
- View reading statistics
- Search and filter your library
- Offline-first with Supabase sync

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Expo Router** for file-based navigation
- **Supabase** for backend (PostgreSQL + Auth)
- **Ionicons** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)
- Supabase account (free tier works)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/fermindi/inkwell.git
cd inkwell
```

2. Install dependencies:
```bash
npm install
```

3. Create a Supabase project and run the schema:
```sql
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  original_title TEXT,
  author TEXT,
  genre TEXT,
  pages INTEGER,
  status TEXT DEFAULT 'to_read' CHECK (status IN ('to_read', 'reading', 'completed')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  progress TEXT,
  start_date DATE,
  completion_date DATE,
  week INTEGER,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated" ON books FOR ALL USING (true);
```

4. Copy environment file and add your Supabase credentials:
```bash
cp .env.example .env
```

5. Start the development server:
```bash
npx expo start
```

6. Scan the QR code with Expo Go to run on your phone.

## Project Structure

```
inkwell/
├── app/                    # Expo Router screens
│   ├── (tabs)/             # Tab navigation
│   │   ├── index.tsx       # Books list
│   │   └── stats.tsx       # Statistics
│   ├── book/[id].tsx       # Book details
│   ├── add.tsx             # Add book form
│   └── _layout.tsx         # Root layout
├── components/             # Reusable components
│   ├── BookCard.tsx
│   ├── BookForm.tsx
│   └── StatusBadge.tsx
├── hooks/                  # Custom hooks
│   └── useBooks.ts         # Books CRUD operations
├── lib/                    # Utilities
│   ├── supabase.ts         # Supabase client
│   └── types.ts            # TypeScript types
└── assets/                 # Images and icons
```

## Building for Production

```bash
# Build APK for Android
eas build -p android --profile preview

# Build for iOS
eas build -p ios --profile preview
```

## License

MIT
