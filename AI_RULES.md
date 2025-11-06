# AI Studio Application Rules

This document outlines the core technologies used in this application and provides guidelines for their usage.

## Tech Stack

*   **React**: The primary JavaScript library for building user interfaces.
*   **TypeScript**: Used for type safety and improved code quality across the entire codebase.
*   **Tailwind CSS**: A utility-first CSS framework for styling components and layouts.
*   **React Router**: For declarative routing within the application.
*   **Firebase (Mocked)**: The intended backend for data storage (Firestore), authentication, and file storage (Cloud Storage), currently simulated with in-memory data.
*   **Shadcn/ui**: A collection of re-usable components built with Radix UI and Tailwind CSS.
*   **Radix UI**: Low-level UI primitives used as the foundation for Shadcn/ui components.
*   **Lucide React**: A library for easily integrating vector icons.
*   **Vite**: The build tool used for a fast development experience.

## Library Usage Rules

*   **UI Components**:
    *   Prioritize using components from **shadcn/ui** for common UI elements (buttons, inputs, dialogs, etc.).
    *   If a specific component is not available in shadcn/ui or requires significant customization, create a new, small, and focused **React component** in `src/components/`.
    *   Avoid modifying existing shadcn/ui component files directly; create new components if changes are needed.
*   **Styling**:
    *   **Tailwind CSS** must be used exclusively for all styling. Apply classes directly to elements.
    *   Avoid inline styles or separate CSS files unless absolutely necessary for a very specific, isolated case (and only after discussion).
*   **Routing**:
    *   Use **React Router** for all navigation and route management. Keep route definitions in `src/App.tsx`.
*   **State Management**:
    *   For local component state, use **React's `useState` hook**.
    *   For global or shared state, use **React's `useContext` hook** with a `Provider` (e.g., `AuthProvider`, `ThemeProvider`).
*   **Icons**:
    *   Integrate icons using the **lucide-react** package.
*   **Backend Interactions**:
    *   All data fetching, adding, updating, and deleting operations should be handled through the functions defined in `src/services/firebase.ts`.
    *   File uploads (images, documents) should use the `uploadImage` function in `src/services/firebase.ts`.
*   **Modals/Dialogs**:
    *   For new modal or dialog implementations, leverage **shadcn/ui's Dialog component** (which is built on Radix UI). The existing `ConfirmationModal.tsx` is a custom implementation, but for new features, prefer shadcn/ui.
*   **Forms**:
    *   Use standard HTML form elements (`<input>`, `<textarea>`, `<select>`) managed with React state.
    *   For form validation, implement client-side checks using React state.
*   **File Structure**:
    *   New components should be placed in `src/components/`.
    *   New pages should be placed in `src/pages/`.
    *   Utility functions or hooks should be placed in `src/utils/` or `src/hooks/` respectively.
    *   Directory names must be all lower-case.