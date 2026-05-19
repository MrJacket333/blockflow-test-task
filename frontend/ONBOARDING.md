# Frontend - Onboarding Pages

This frontend application contains 5 onboarding pages generated from the Figma design "Fullstack Developer_Test Task".

## Pages Overview

### 1. Onboarding1 - Main Wish Selection
**File:** `src/pages/Onboarding1.tsx`

Features:
- Header with progress bar and back button
- Title: "What is your main wish?"
- 5 selectable options with emoji icons
- Hover and selection states
- Responsive design

### 2. Onboarding2 - Weight Input
**File:** `src/pages/Onboarding2.tsx`

Features:
- Header with progress bar
- Title: "What is your weight?"
- Segmented control for unit selection (lbs/kg)
- Large numeric input field
- Validation message showing min/max values
- Continue button (disabled until valid input)

### 3. Onboarding3 - Loading Progress
**File:** `src/pages/Onboarding3.tsx`

Features:
- Header (no progress bar)
- Circular progress indicator with percentage (0-100%)
- Animated progress using SVG
- Loading message
- Testimonial card with 5-star rating
- Auto-incrementing progress simulation

### 4. Onboarding4 - Goal Weight with Info Card
**File:** `src/pages/Onboarding4.tsx`

Features:
- Header with progress bar
- Title: "What is your goal weight?" (with "goal" highlighted)
- Segmented control for unit selection
- Numeric input with pre-filled value
- Info card explaining the goal (5% weight loss)
- Continue button

### 5. Onboarding5 - Goal Weight Simple
**File:** `src/pages/Onboarding5.tsx`

Features:
- Header with progress bar
- Title: "What is your goal weight?" (with "goal" highlighted)
- Segmented control for unit selection
- Numeric input field
- Validation message
- Continue button (disabled until valid input)

## Shared Components

### Header
**File:** `src/components/Header.tsx`

Reusable header component with:
- Back button with chevron icon
- Progress bar
- Configurable progress percentage

### ProgressBar
**File:** `src/components/ProgressBar.tsx`

Progress indicator with:
- Gradient fill (blue to green)
- Configurable progress percentage
- Smooth animations

### Button
**File:** `src/components/Button.tsx`

Primary action button with:
- Gradient background
- Disabled state styling
- Hover effects

## Technology Stack

- **React 19** - UI framework
- **TypeScript 6** - Type safety
- **Vite 8** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework

## Design System

### Colors
- Primary gradient: `#1fa9c7` → `#1bb97c` (blue to green)
- Background: `#f8f8fb` (light gray)
- Text primary: `#141415` (near black)
- Text secondary: `#555557` (gray)
- Text tertiary: `#82818c` (light gray)
- Border: `#dad9e0` (light gray)
- Accent green: `#099678`

### Typography
- **Font Family:** Geologica (primary), Nunito (testimonials)
- **Heading H1:** 44px, weight 400, line-height 1.1
- **Heading H2:** 36px, weight 400, line-height 1.1
- **Body Large:** 22px, weight 400, line-height 1.25
- **Body Medium:** 18px, weight 400, line-height 1.25

### Spacing
- Container padding: 120px horizontal, 56px vertical
- Component gaps: 16px, 20px, 40px, 64px
- Border radius: 10px, 12px, 16px, 1000px (pill)

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at http://localhost:5173/ (or another port if 5173 is in use).

## Navigation

The main App component includes a navigation bar at the top that allows you to switch between all 5 onboarding pages for easy demonstration and testing.

## Implementation Notes

- All pages are fully responsive and match the Figma design specifications
- Components use Tailwind CSS for styling with custom color values from the design
- Interactive elements include hover states and transitions
- Form validation is implemented for weight input fields
- The loading page includes an animated progress indicator
- All typography uses the Geologica font family as specified in the design
