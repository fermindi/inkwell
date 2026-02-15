# Backlog

Prioritized future tasks for Inkwell app.

---

## High Priority

### US-001: Add Book Cover Images
**Type:** Story
**Priority:** High
**Effort:** M
**Description:** Fetch book covers from Open Library API using ISBN or title search.
**Acceptance Criteria:**
- [ ] Search Open Library by title/author
- [ ] Display cover thumbnail in BookCard
- [ ] Show full cover in book details
- [ ] Cache images locally
**Dependencies:** None
**Notes:** Open Library API is free, no auth required

---

### US-002: Implement Dark Mode
**Type:** Story
**Priority:** High
**Effort:** S
**Description:** Add dark mode support with system preference detection.
**Acceptance Criteria:**
- [ ] Detect system color scheme
- [ ] Toggle in settings
- [ ] Persist preference
- [ ] All screens support both modes
**Dependencies:** None

---

## Medium Priority

### US-003: Reading Reminders
**Type:** Story
**Priority:** Medium
**Effort:** M
**Description:** Send notifications to remind user to read.
**Acceptance Criteria:**
- [ ] Configure reminder time
- [ ] Daily/weekly options
- [ ] Snooze functionality
**Dependencies:** expo-notifications

---

### US-004: Data Backup/Export
**Type:** Story
**Priority:** Medium
**Effort:** S
**Description:** Export all books to JSON for backup.
**Acceptance Criteria:**
- [ ] Export to JSON file
- [ ] Import from JSON
- [ ] Share via system share sheet
**Dependencies:** expo-file-system, expo-sharing

---

### US-005: Build Production APK
**Type:** DevTask
**Priority:** Medium
**Effort:** S
**Description:** Configure EAS Build and generate APK.
**Acceptance Criteria:**
- [ ] Configure eas.json
- [ ] Build preview APK
- [ ] Test on physical device
- [ ] Document build process
**Dependencies:** EAS account

---

## Low Priority

### US-006: Reading Goals
**Type:** Story
**Priority:** Low
**Effort:** L
**Description:** Set yearly/monthly reading goals and track progress.
**Acceptance Criteria:**
- [ ] Set books per year goal
- [ ] Set pages per month goal
- [ ] Progress visualization
- [ ] Celebration on goal completion

---

### US-007: Book Recommendations
**Type:** Story
**Priority:** Low
**Effort:** L
**Description:** Suggest books based on reading history.
**Acceptance Criteria:**
- [ ] Analyze favorite genres
- [ ] Suggest similar authors
- [ ] Integration with Goodreads/Open Library

---

## Completed (Archive)

### Initial Setup (2026-02-15)
- [x] Create Expo project with TypeScript
- [x] Setup Supabase integration
- [x] Create CRUD hooks
- [x] Implement all screens
- [x] Create GitHub repository

**Result:** MVP structure complete, ready for Supabase configuration.
