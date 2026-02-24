# Arzi Anime List

A modern, responsive anime list application built with Next.js 16, featuring multi-page navigation, real-time anime data from Jikan API, and a beautiful UI powered by Shadcn UI and Tailwind CSS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## Features

- **Browse Anime** - Discover anime with comprehensive information including ratings, episodes, genres, and studios
- **Multi-Page Navigation** - Easy navigation between Home, On Going, Completed, and Favorite pages
- **Day-Based Filtering** - Filter currently airing anime by release day (Monday through Sunday)
- **Responsive Design** - Beautiful UI that works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode** - Toggle between dark and light themes
- **Infinite Scroll** - Load more anime as you scroll through the lists
- **Detailed Information** - View comprehensive anime details including synopsis, broadcast schedule, and more

## Tech Stack

- **Framework** - [Next.js 16](https://nextjs.org/) (App Router)
- **Language** - [TypeScript](https://www.typescriptlang.org/)
- **State Management** - [TanStack Query v5](https://tanstack.com/query/latest)
- **UI Components** - [Shadcn UI](https://ui.shadcn.com/)
- **Styling** - [Tailwind CSS v4](https://tailwindcss.com/)
- **API** - [Jikan API](https://docs.api.jikan.moe/) (Unofficial MyAnimeList API)
- **Package Manager** - [Bun](https://bun.sh/)

## Project Structure

```
arzi-anime-list/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── anime/[id]/         # Anime detail page
│   │   ├── completed/          # Completed anime page
│   │   ├── favorite/           # Favorites page (coming soon)
│   │   ├── on-going/           # Currently airing anime page
│   │   ├── layout.tsx          # Root layout with navbar and footer
│   │   ├── page.tsx            # Home page with featured sections
│   │   └── globals.css         # Global styles
│   │
│   ├── components/             # React components
│   │   ├── ui/                 # Shadcn UI components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── tabs.tsx
│   │   ├── anime-card.tsx              # Vertical anime card component
│   │   ├── anime-horizontal-card.tsx   # Horizontal anime card component
│   │   ├── anime-horizontal-skeleton.tsx
│   │   ├── anime-skeleton.tsx
│   │   ├── footer.tsx                  # Footer component
│   │   ├── navbar.tsx                  # Navigation bar with theme toggle
│   │   └── theme-provider.tsx          # Theme context provider
│   │
│   ├── lib/                    # Utility functions and configurations
│   │   ├── api.ts              # API functions for Jikan API
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useAnime.ts     # Anime data fetching hooks
│   │   ├── query-client.ts     # TanStack Query client configuration
│   │   └── utils.ts            # Utility functions
│   │
│   └── types/                  # TypeScript type definitions
│       └── anime.ts            # Anime-related types
│
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (recommended) or npm/yarn/pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/arzi-anime-list.git
cd arzi-anime-list
```

2. Install dependencies:

```bash
bun install
```

3. Run the development server:

```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
bun run build
bun start
```

## API Usage

This project uses the [Jikan API](https://docs.api.jikan.moe/), which is an unofficial API for MyAnimeList. Please respect the API's rate limits and terms of service.

- **Rate Limit**: 3 requests per second
- **Documentation**: [https://docs.api.jikan.moe/](https://docs.api.jikan.moe/)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with featured anime sections |
| `/on-going` | Currently airing anime with day-based filtering |
| `/completed` | Completed/highly-rated anime list |
| `/favorite` | Favorites page (coming soon) |
| `/anime/[id]` | Detailed information about a specific anime |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Jikan API](https://docs.api.jikan.moe/) for providing the anime data
- [MyAnimeList](https://myanimelist.net/) as the source of anime information
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org/) team for the amazing framework

## Disclaimer

This project uses data from MyAnimeList (via Jikan API). All anime information, images, and related data are property of their respective owners.

---

Made with ❤️ for anime lovers
