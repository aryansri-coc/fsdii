# Experiment 4: Interactive Calendar Interface for Scheduling and Managing Posts

## Aim
To design and implement an interactive calendar interface for scheduling and managing posts.

## Objectives
- Understand time-based data visualization in UI systems
- Implement calendar-based scheduling interfaces
- Map structured data to temporal layouts (day, week, and month views)
- Enable user interactions such as drag-and-drop rescheduling and modal-based editing
- Synchronize calendar interactions with application state using Redux Toolkit

## Course Outcomes & Taxonomy
- **CO Mapped:** CO3
- **Bloom's Taxonomy:** BT3 (Apply)

## Tech Stack & Requirements
- **Framework:** React.js (Vite)
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Icons:** `lucide-react`
- **Testing:** Vitest & React Testing Library

## Implementation & Procedure
1. **Calendar Layouts (Temporal Visualization):**
   - **Month View:** 7-column grid representing 42 calendar days (6 weeks) including previous and next month buffer days.
   - **Week View:** 7-column focused view of the active week.
   - **Day View:** Linear timeline view detailing posts scheduled for the selected date.
2. **Temporal Data Modeling:**
   - Posts are modeled with `id`, `title`, `content`, `date` (YYYY-MM-DD), `time` (HH:MM), and `platform`.
3. **Dynamic Event Mapping:**
   - Post data is grouped by date and rendered into corresponding calendar date cells and timeline slots.
4. **Interactive Scheduling:**
   - **Click to Add/Edit:** Clicking an empty cell opens the creation modal for that date; clicking a post opens the edit/delete modal.
   - **Drag-and-Drop:** Native HTML5 drag-and-drop allows dragging a post card and dropping it into any date cell to update its schedule.
5. **Redux State Synchronization:**
   - `calendarSlice`: Manages `currentDate` and `viewMode` ('month' | 'week' | 'day').
   - `postsSlice`: Manages posts state with `addPost`, `updatePost`, `deletePost`, and `movePost` reducers.

## Running the Project
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run automated tests
npm test

# Build for production
npm run build
```
