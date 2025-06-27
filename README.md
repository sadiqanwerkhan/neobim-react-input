# NeoBIM React Test Assignment

This is a minimal, professional React + TypeScript application built to complete the NeoBIM frontend test assignment. It demonstrates a parameter input component that syncs with multiple selected CAD-like objects and handles updates gracefully.

---

## Task Overview

Build a reusable input field in React that behaves as follows:

- Displays the parameter of a single selected object
- Displays the shared parameter of multiple objects if values are the same
- Shows `***varies***` when values differ
- Allows the user to update all selected objects by typing a new value
- Reacts to external parameter change events (`parametersChanged`)

---

## Project Structure

src/
├── components/
│ └── ParameterInput.tsx # Main input logic implementation
├── types/
│ └── IBaseObject.ts # Type definitions as per assignment
├── tests/
│ └── ParameterInput.test.tsx # Test cases covering all behaviors
├── App.tsx # Demo setup with mock objects
├── setupTests.ts # Testing library setup
vite.config.ts # Vite + Vitest config
tsconfig.json # TypeScript config for app + tests

---

## Key Features

- React Functional Component with clean state logic
- Fully reactive to parameter changes
- Covers all edge cases: same value, varied, updates, external event handling
- Unit tested using Vitest + Testing Library
- Organized with professional Git workflow (feature branches + PRs)

---

## Running Locally

```bash
# Install dependencies
npm install

# Start the development preview
npm run dev

# Run all tests
npx vitest run


Tests Included
- Single object shows correct value

- Multiple objects with same value show that value

- Different values show ***varies***

- Typing in input updates all objects

- External parametersChanged events are handled
```
