# Active Tasks

## Current Sprint

**Sprint:** Inkwell MVP Setup
**Goal:** Create functional reading tracker app with Supabase backend
**Status:** Initial Setup Complete

---

## Today's Focus

1. Configure Supabase project and import data
2. Install npm dependencies
3. Test app with Expo Go

---

## Completed (2026-02-15)

- [x] DEV-001: Create Expo project structure
  - React Native + TypeScript setup
  - Expo Router file-based navigation
  - Package.json with all dependencies

- [x] DEV-002: Configure Supabase client
  - Created lib/supabase.ts
  - Created lib/types.ts with Book types
  - Environment variables setup (.env.example)

- [x] DEV-003: Create custom hooks
  - useBooks hook with CRUD operations
  - useBook for single book fetch
  - useBookStats for statistics

- [x] DEV-004: Create UI components
  - BookCard.tsx - Book list item
  - BookForm.tsx - Add/edit form
  - StatusBadge.tsx - Status indicator

- [x] DEV-005: Implement screens
  - (tabs)/index.tsx - Books list with search/filter
  - (tabs)/stats.tsx - Reading statistics
  - add.tsx - Add new book modal
  - book/[id].tsx - Book details

- [x] DEV-006: Create GitHub repository
  - Repo: https://github.com/fermindi/inkwell
  - Initial commit pushed

---

## Pending (User Action Required)

- [ ] SETUP-001: Create Supabase project
  - Go to supabase.com/dashboard
  - Create new project
  - Run SQL schema from README.md
  - Priority: **High**

- [ ] SETUP-002: Import books data
  - Import books.json from mcp-database-server/data/exports/
  - Use Supabase Table Editor → Import
  - Priority: **High**

- [ ] SETUP-003: Configure environment
  - Copy .env.example to .env
  - Add Supabase URL and anon key
  - Priority: **High**

- [ ] SETUP-004: Install dependencies and test
  - Run `npm install`
  - Run `npx expo start`
  - Test with Expo Go app
  - Priority: **High**

---

## Backlog

- [ ] US-001: Add book cover images (via Open Library API)
- [ ] US-002: Implement dark mode
- [ ] US-003: Add reading reminders/notifications
- [ ] US-004: Export/import data backup
- [ ] US-005: Build and publish APK

---

## Notes

- Data exported from mcp-database-server: 54 books
- Export file: `C:\Users\diego\mcp-database-server\data\exports\books.json`
