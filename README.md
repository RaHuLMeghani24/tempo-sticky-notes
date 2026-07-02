# Sticky Notes

A single-page sticky notes application built with React and TypeScript. The app allows users to create, edit, move, resize, reorder, delete, and persist notes. It is designed for desktop usage and uses custom React components with plain CSS.

## Features

- Create new sticky notes with automatic board placement
- Edit note text directly inside each note
- Move notes by dragging the note handle
- Resize notes by dragging the resize handle
- Bring notes to front when focused or dragged
- Delete notes by dragging them over a predefined trash zone
- Delete all notes with confirmation
- Use different note colors
- Persist notes using an asynchronous mocked REST API

## Architecture

The application is split into small, focused modules. App is responsible for composing the main layout and wiring the toolbar, board, and note state together. The useNotes hook owns note state, note creation, note updates, deletion, z-index handling, and persistence. Board-level behavior, such as detecting whether a dragged note overlaps with the trash zone, is handled by the Board component.

Individual note interactions are isolated inside StickyNote. Pointer events are used for dragging and resizing so the behavior works consistently across modern desktop browsers. The note component updates the DOM directly during active dragging or resizing for smoother interaction, then commits the final position or size back to React state when the pointer is released.

Shared logic is kept outside components. Note dimensions, layout values, and color themes live in constants. Rectangle overlap and clamping helpers live in utils/geometry. Note placement logic lives in utils/notePlacement. Persistence is accessed through api/stickyNotesApi, which behaves like an asynchronous REST API while using localStorage as a mock backing store. This keeps the UI independent from the storage implementation and makes it easier to replace the mock with a real backend later.

## Tech Stack

- React
- TypeScript
- Vite
- Plain CSS
- Mocked async API backed by localStorage

## Getting Started

Install dependencies:

```bash
npm install