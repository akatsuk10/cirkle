# Design Document: Coss UI Migration

## Overview

This design outlines the migration strategy for transitioning the Cirkle landing page from custom Tailwind CSS components to the Coss UI component library with the zinc theme. The migration will be executed using the shadcn CLI to install components, ensuring we get the optimized color system and all necessary dependencies automatically.

The approach prioritizes maintaining existing functionality while upgrading the visual design system to use professionally crafted components with enhanced visual depth and consistency.

## Architecture

### Component Installation Strategy

We'll use the shadcn CLI to install Coss UI components rather than manual copy-paste. This approach provides:

1. **Automatic dependency management**: CLI installs all required packages
2. **Color system integration**: Zinc theme colors are automatically configured
3. **Consistent structure**: Components are placed in the standard `components/ui/` directory
4. **Easy updates**: Future component updates can be managed through CLI

### Installation Command

```bash
pnpm dlx shadcn@latest add https://coss.com/r/styles @coss/colors-zinc
```

This single command will:
- Install all UI primitives (button, card, dropdown-menu, badge, etc.)
- Configure the zinc color system with optimized CSS variables
- Set up the necessary file structure

### Component Mapping

| Current Implementation | Coss UI Component | Location |
|------------------------|-------------------|----------|
| Custom button elements | `Button` | `components/ui/button.tsx` |
| Custom card divs | `Card`, `CardHeader`, `CardContent`, `CardFooter` | `components/ui/card.tsx` |
| Custom dropdown menu | `DropdownMenu` | `components/ui/dropdown-menu.tsx` |
| Custom badge spans | `Badge` | `components/ui/badge.tsx` |

## Components and Interfaces

### 1. Header Component Updates

**File**: `components/landing/Header.tsx`

**Changes**:
- Replace custom button with `<Button>` component
- Replace wallet dropdown menu with `<DropdownMenu>` component
- Update color classes to use zinc theme variables
- Maintain existing wallet adapter integration

**Component Structure**:
```tsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Navigation items remain as custom styled elements
// Main CTA button uses <Button variant="default">
// Wallet dropdown uses <DropdownMenu> with <DropdownMenuItem>
```

### 2. Features Component Updates

**File**: `components/landing/Features.tsx`

**Changes**:
- Replace custom card divs with `<Card>` components
- Use `<CardHeader>`, `<CardContent>`, `<CardFooter>` for structure
- Replace custom buttons with `<Button>` component
- Update badge with `<Badge>` component for "14 day free trial"
- Apply zinc theme colors throughout

**Component Structure**:
```tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Each pricing tier becomes a <Card>
// Pricing info goes in <CardHeader>
// Features list goes in <CardContent>
// CTA button goes in <CardFooter>
```

### 3. BrandSection Component

**File**: `components/landing/BrandSection.tsx`

**Changes**:
- Update text colors to use zinc theme variables
- Replace `text-gray-900` with theme-aware classes
- Maintain existing layout and styling approach

### 4. MainContent Component

**File**: `components/landing/MainContent.tsx`

**Changes**:
- Update border colors to use zinc theme
- Apply consistent spacing using theme variables
- Maintain existing layout structure

### 5. LandingPage Component

**File**: `components/LandingPage.tsx`

**Changes**:
- Update background color to use zinc theme variable
- Remove unused imports (MainContent, TrustedBy, Features, etc.)
- Clean up component structure

## Data Models

No new data models are required. All existing props and state management remain unchanged:

- Wallet connection state (from `@solana/wallet-adapter-react`)
- Scroll state for header behavior
- Menu open/close state for dropdowns

## Styling System

### Color Token Migration

Replace custom color classes with zinc theme tokens:

| Current Class | Zinc Theme Equivalent |
|---------------|----------------------|
| `bg-white` | `bg-background` |
| `text-gray-900` | `text-foreground` |
| `text-gray-600` | `text-muted-foreground` |
| `border-gray-200` | `border-border` |
| `bg-black` | `bg-primary` |
| `text-white` | `text-primary-foreground` |
| `bg-gray-900` | `bg-secondary` |
| `bg-[#065F46]` | `bg-accent` or custom CSS variable |

### CSS Variables Setup

The zinc theme will add these variables to `app/globals.css`:

```css
:root {
  --background: ...;
  --foreground: ...;
  --card: ...;
  --card-foreground: ...;
  --primary: ...;
  --primary-foreground: ...;
  --secondary: ...;
  --secondary-foreground: ...;
  --muted: ...;
  --muted-foreground: ...;
  --accent: ...;
  --accent-foreground: ...;
  --destructive: ...;
  --destructive-foreground: ...;
  --border: ...;
  --input: ...;
  --ring: ...;
  --radius: ...;
  /* Additional Coss UI tokens */
  --info: ...;
  --info-foreground: ...;
  --success: ...;
  --success-foreground: ...;
  --warning: ...;
  --warning-foreground: ...;
}
```

### Custom Brand Colors

For the Cirkle brand color (red accent) and custom green (`#065F46`), we'll:
1. Keep the red accent as inline style or custom class for the logo dot
2. Map the green color to an appropriate theme variable or create a custom CSS variable

## Button Variants

Coss UI Button component supports these variants:

- `default`: Solid background (for primary CTAs)
- `secondary`: Secondary styling
- `outline`: Outlined button
- `ghost`: Transparent background
- `link`: Link-styled button

**Usage in Landing Page**:
- Header "Get Started" button: `variant="default"`
- Pricing card buttons: `variant="default"`
- Potential future outline buttons: `variant="outline"`

## Error Handling

### Installation Issues

If CLI installation fails:
1. Verify pnpm is installed and up to date
2. Check network connectivity
3. Manually install dependencies if needed
4. Fall back to manual component copy-paste from Coss UI docs

### Component Integration Issues

If components don't render correctly:
1. Verify all imports are correct
2. Check that CSS variables are properly loaded
3. Ensure Tailwind CSS v4 is configured correctly
4. Validate that all required dependencies are installed

### Styling Conflicts

If existing styles conflict with Coss UI:
1. Use `cn()` utility from `tailwind-merge` to merge classes properly
2. Override specific styles with custom classes when needed
3. Ensure global CSS doesn't interfere with component styles

## Testing Strategy

### Visual Testing

1. **Component Rendering**: Verify all components render with correct styling
2. **Responsive Design**: Test on mobile, tablet, and desktop viewports
3. **Theme Consistency**: Ensure zinc theme is applied consistently
4. **Interactive States**: Test hover, focus, and active states

### Functional Testing

1. **Wallet Connection**: Verify wallet modal opens and connection works
2. **Dropdown Menus**: Test dropdown open/close and disconnect functionality
3. **Navigation**: Ensure header scroll behavior works correctly
4. **Button Clicks**: Verify all buttons trigger correct actions

### Browser Testing

Test in major browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari

### Accessibility Testing

1. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
2. **Screen Reader**: Verify proper ARIA labels and semantic HTML
3. **Focus Management**: Check focus indicators are visible
4. **Color Contrast**: Validate WCAG AA compliance

## Migration Phases

### Phase 1: Setup and Installation
1. Run CLI command to install Coss UI components and zinc theme
2. Verify CSS variables are added to globals.css
3. Confirm all dependencies are installed

### Phase 2: Component Updates
1. Update Header component with Button and DropdownMenu
2. Update Features component with Card and Badge
3. Update BrandSection with theme colors
4. Update MainContent with theme colors
5. Clean up LandingPage component

### Phase 3: Testing and Refinement
1. Visual QA across all viewports
2. Functional testing of all interactions
3. Accessibility audit
4. Performance check
5. Final polish and adjustments

## Performance Considerations

- Coss UI components are tree-shakeable (only imported components are bundled)
- No runtime overhead from component library (components are copied into project)
- Zinc theme uses CSS variables (minimal performance impact)
- Maintain existing code splitting and lazy loading strategies

## Accessibility Compliance

Coss UI components are built on Base UI, which provides:
- ARIA attributes out of the box
- Keyboard navigation support
- Focus management
- Screen reader compatibility

We'll maintain these accessibility features throughout the migration.

## Future Enhancements

After successful migration, consider:
1. Adding more Coss UI components (Tooltip, Dialog, Tabs)
2. Implementing dark mode using theme variables
3. Creating custom component variants for brand-specific needs
4. Exploring Coss UI particles for complex patterns
5. Integrating Coss UI atoms for API-enhanced components
