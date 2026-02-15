# Architectural Decisions

This file tracks major architectural decisions for the Inkwell project.

---

## DEC-001: Use React Native + Expo
**Date:** 2026-02-15
**Status:** Active
**Context:** Need to build Android app for personal reading tracker. Options: native Kotlin, React Native, Flutter.
**Decision:** Use React Native with Expo framework.
**Rationale:**
- Developer already familiar with JavaScript/TypeScript (mcp-database-server is JS)
- Expo simplifies development (no Android Studio setup)
- Can test immediately with Expo Go app
- Future possibility to add web version with same codebase
**Impact:** Faster development, easier testing, but slightly larger app size than native.

---

## DEC-002: Use Supabase as Backend
**Date:** 2026-02-15
**Status:** Active
**Context:** Need backend for storing books data. Options: local SQLite only, custom Express API, Supabase, Firebase.
**Decision:** Use Supabase (PostgreSQL + Auth + Storage).
**Rationale:**
- Free tier sufficient for personal use (500MB)
- PostgreSQL compatible with existing Prisma knowledge
- Built-in auth for future multi-device sync
- Real-time subscriptions available
- Already prepared from mcp-database-server Prisma migration
**Impact:** Requires internet for sync, but data persists in cloud.

---

## DEC-003: File-based Routing with Expo Router
**Date:** 2026-02-15
**Status:** Active
**Context:** Need navigation structure for the app.
**Decision:** Use Expo Router (file-based routing like Next.js).
**Rationale:**
- Convention over configuration
- Type-safe routes with TypeScript
- Automatic deep linking
- Standard in Expo SDK 49+
**Impact:** Directory structure defines routes, cleaner organization.

---

## DEC-004: Soft Delete Pattern for Books
**Date:** 2026-02-15
**Status:** Active
**Context:** How to handle book deletion.
**Decision:** Use soft delete with `is_deleted` boolean and `deleted_at` timestamp.
**Rationale:**
- Matches existing pattern from mcp-database-server
- Allows undo/restore functionality
- Maintains data integrity for statistics
- Can hard delete later if needed
**Impact:** Slightly larger database, but safer data management.

---

## Adding New Decisions

When making significant architectural choices:
1. Assign next DEC number (DEC-005, DEC-006, etc.)
2. Fill in all sections
3. Commit with message: `docs: add DEC-XXX decision`
