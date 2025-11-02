# Thank You Card Generator

A beautiful, modern web application for creating personalized thank you cards with custom images, text, and styling. Built with Next.js, React, and TypeScript.

![Thank You Card Creator](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38bdf8?style=flat-square&logo=tailwind-css)

## Features

✨ **Image Selection**
- Browse and search high-quality images from Unsplash
- Random image selection for inspiration
- Pagination support for search results
- Real-time preview

🎨 **Text Customization**
- Customize your name or message
- Adjustable font sizes for both "Thank You" and name text
- Multiple font family options (Serif, Sans Serif, Monospace, Cursive)
- 8 beautiful color options for text
- Real-time preview of changes

📱 **Modern UI/UX**
- Responsive design for all devices
- Dark mode support
- Smooth animations and transitions
- Intuitive interface

💾 **Export & Download**
- Download cards as high-quality PNG images
- 4:5 aspect ratio optimized for social sharing
- Instant download with a single click

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Image API:** [Unsplash API](https://unsplash.com/developers)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)
- An [Unsplash API](https://unsplash.com/developers) access key (free)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd tycg
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

To get an Unsplash API key:
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy your Access Key
4. Paste it into `.env.local`

### 4. Run the Development Server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
tycg/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Main application page
│   └── globals.css          # Global styles and Tailwind config
├── components/
│   ├── card-preview.tsx     # Canvas-based card preview component
│   ├── image-selector.tsx   # Image search and selection component
│   ├── text-customizer.tsx  # Text customization controls
│   └── ui/                  # Reusable UI components (Radix UI based)
├── lib/
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
└── package.json             # Dependencies and scripts
```

## Usage Guide

### Creating a Thank You Card

1. **Select an Image**
   - Click "Get Random Images" to browse random photos
   - Or use the search bar to find specific images
   - Click on any image to select it

2. **Customize Text**
   - Enter your name in the "Your Name" field
   - Adjust font sizes using the sliders
   - Choose a font style that matches your preference
   - Select a text color that contrasts well with your image

3. **Preview**
   - See your card preview update in real-time on the right
   - The preview shows exactly how your final card will look

4. **Download**
   - Click the "Download Card" button
   - Your card will be saved as a PNG image
   - File name format: `thank-you-card-[timestamp].png`

## Features in Detail

### Image Selection
- **Random Images:** Browse curated random images from Unsplash
- **Search:** Find images by keywords (e.g., "nature", "sunset", "flowers")
- **Pagination:** Navigate through search results with previous/next buttons
- **Responsive Grid:** Images displayed in a 2-column responsive grid

### Text Customization
- **Name Field:** Customize the name displayed at the bottom (max 30 characters)
- **Font Sizes:** 
  - Name font size: 24px - 72px
  - "Thank You" font size: 32px - 96px
- **Font Families:** Serif, Sans Serif, Monospace, Cursive
- **Colors:** White, Black, Red, Teal, Blue, Yellow, Green, Orange

### Card Preview
- **Canvas Rendering:** Uses HTML5 Canvas for high-quality rendering
- **Aspect Ratio:** 4:5 ratio optimized for cards
- **Semi-transparent Overlay:** Ensures text readability over any image
- **Text Shadows:** Adds depth and visibility to text

## Customization

### Adding New Font Options

Edit `components/text-customizer.tsx`:

```typescript
const FONT_FAMILIES = [
  { value: "serif", label: "Serif" },
  { value: "sans-serif", label: "Sans Serif" },
  { value: "monospace", label: "Monospace" },
  { value: "cursive", label: "Cursive" },
  // Add your font here
  { value: "fantasy", label: "Fantasy" },
]
```

### Adding New Colors

Edit the `COLORS` array in `components/text-customizer.tsx`:

```typescript
const COLORS = ["#ffffff", "#000000", "#ff6b6b", /* ... add your colors */]
```

### Changing Card Dimensions

Edit `components/card-preview.tsx`:

```typescript
const width = 400  // Change width
const height = 500 // Change height
```

## Troubleshooting

### Images Not Loading
- Verify your Unsplash API key is set correctly in `.env.local`
- Check that your API key has the correct permissions
- Ensure you're not exceeding Unsplash API rate limits

### Download Not Working
- Ensure you've selected an image first
- Check browser console for any errors
- Try a different browser if issues persist

### Canvas Not Rendering
- Clear your browser cache
- Ensure JavaScript is enabled
- Try disabling browser extensions that might interfere

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Unsplash](https://unsplash.com/) for providing beautiful free images
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for beautiful icons

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ using Next.js and React

