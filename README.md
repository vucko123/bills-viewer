# Bills Information Viewer

> React + TypeScript + Material UI web app for exploring Oireachtas bills from
> Swagger data.  
> Demonstrates clean architecture, state management, and professional
> development practices.

---

## Overview

This application consumes the [Oireachtas API](https://api.oireachtas.ie/) and
provides an interactive UI for browsing, filtering, and favoriting Irish
parliamentary bills.

---

## Features

- Table view of bills with pagination
- Columns: Bill number, Bill type, Bill status, Sponsor
- Filter bills by Bill type and Bill status
- Modal with tabs: English title / Gaeilge title
- Favorite/unfavorite bills with persistence in state (mocked server call +
  console log)
- Separate tab to view all favorited bills
- Responsive UI using Material UI

---

## Architecture

### Context (C1)

- **Users** interact via browser
- **Bills Viewer Web App** fetches data from **Oireachtas API**
- **State Store** (favorites persisted locally)
- **Mock Server Layer** (for favorite actions, console log only)

### Containers (C2)

- **Web App**: React + TypeScript + MUI
- **Data Layer**: Axios + React Query
- **State Layer**: Zustand (favorites)
- **UI Layer**: MUI components (Table, Modal, Tabs)
- **Testing Layer**: Jest/Vitest + React Testing Library

### Components (C3)

- `BillsTable`: renders paginated list
- `Modal`: shows bill titles with tabs
- `SelectType`: bill type filter
- `FavoritesStore`: Zustand store for favorites
- `useBillApi`: hook for fetching paginated bills
- `FilterMenu`: filter bills by status, year, date from, date to and last
  updated using API, if on favorites filtering from persisted storage
- `ThemeChange`: chekcks if there is in local storage presisted theme, otherwise
  takes current browser theme (It can be romoved from inspect -> application ->
  clear localStorage)

### Runtime Example

- User clicks **Favorite** → State updates → Console logs
  `"Dispatch favorite: Bill #123"`

### Deployment

- Local: Vite dev server
- Production: static build served via Vercel/Netlify/Nginx

---

## Getting Started

### Prerequisites

- Node.js LTS (>= 18)
- npm

### Installation

```bash
git clone <your-repo-url>
cd bills-viewer
npm install
```

### Running app localy

```bash
npm run dev
```

- App will be available on localhost:5173

### Running app localy with docker

```bash
docker build -t vite-react-app .
docker run -p 3000:80 vite-react-app
```

- App will be available on localhost:3000
