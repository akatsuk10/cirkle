# Implementation Plan

- [x] 1. Install Coss UI components and zinc theme
  - Run the shadcn CLI command to install all UI primitives and the zinc color system
  - Verify that components are created in `components/ui/` directory
  - Confirm CSS variables are added to the global stylesheet
  - Validate all dependencies are installed in package.json
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Update Header component with Coss UI components
  - [x] 2.1 Import Button and DropdownMenu components
    - Add imports for Button component from `@/components/ui/button`
    - Add imports for DropdownMenu components from `@/components/ui/dropdown-menu`
    - _Requirements: 2.1, 2.3, 4.1, 4.2_

  - [x] 2.2 Replace wallet connect button with Coss UI Button
    - Replace custom button element with `<Button variant="default">`
    - Maintain onClick handler for wallet connection
    - Apply appropriate size and styling props
    - _Requirements: 2.1, 2.3_

  - [x] 2.3 Replace wallet dropdown with Coss UI DropdownMenu
    - Implement DropdownMenu with DropdownMenuTrigger and DropdownMenuContent
    - Add DropdownMenuItem for disconnect action
    - Maintain existing menu open/close state logic
    - Preserve disconnect functionality
    - _Requirements: 4.2, 4.3, 4.4_

  - [x] 2.4 Update color classes to use zinc theme variables
    - Replace `text-gray-900` with `text-foreground`
    - Replace `text-gray-600` with `text-muted-foreground`
    - Replace `bg-white` with `bg-background`
    - Replace `border` with `border-border`
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 2.5 Verify header functionality
    - Test wallet connection button click
    - Test dropdown menu open/close
    - Test disconnect functionality
    - Verify scroll behavior and backdrop blur effect
    - _Requirements: 6.2, 6.3_

- [x] 3. Update Features component with Coss UI Card components
  - [x] 3.1 Import Card and Badge components
    - Add imports for Card, CardHeader, CardContent, CardFooter from `@/components/ui/card`
    - Add import for Badge from `@/components/ui/badge`
    - Add import for Button from `@/components/ui/button`
    - _Requirements: 3.1, 3.2_

  - [x] 3.2 Refactor Individuals pricing card
    - Replace custom div with Card component
    - Use CardHeader for title and price
    - Use CardContent for description and features list
    - Use CardFooter for CTA button
    - Replace button with Coss UI Button component
    - _Requirements: 3.1, 3.2, 3.3, 2.1_

  - [x] 3.3 Refactor Teams pricing card (featured)
    - Replace custom div with Card component
    - Add Badge component for "14 day free trial" label
    - Structure content with CardHeader, CardContent, CardFooter
    - Replace button with Coss UI Button component
    - Apply appropriate styling for featured/dark variant
    - _Requirements: 3.1, 3.2, 3.3, 2.1_

  - [x] 3.4 Refactor Organizations pricing card
    - Replace custom div with Card component
    - Structure content with CardHeader, CardContent, CardFooter
    - Replace button with Coss UI Button component
    - _Requirements: 3.1, 3.2, 3.3, 2.1_

  - [x] 3.5 Refactor Enterprise pricing card
    - Replace custom div with Card component
    - Structure content with CardHeader, CardContent, CardFooter
    - Replace button with Coss UI Button component
    - _Requirements: 3.1, 3.2, 3.3, 2.1_

  - [x] 3.6 Update color classes to use zinc theme
    - Replace gray color classes with theme variables
    - Update border colors to use `border-border`
    - Update background colors to use theme variables
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 3.7 Verify responsive grid layout
    - Test card layout on mobile (single column)
    - Test card layout on tablet (2 columns)
    - Test card layout on desktop (4 columns)
    - Ensure equal height cards with flex layout
    - _Requirements: 3.4, 6.4_

- [x] 4. Update BrandSection component with theme colors
  - Replace `text-gray-900` with `text-foreground` or appropriate theme variable
  - Maintain existing text shadow and opacity styling
  - Verify visual appearance matches design intent
  - _Requirements: 5.1, 5.2_

- [x] 5. Update MainContent component with theme colors
  - Replace border color classes with `border-border`
  - Update any background colors to use theme variables
  - Maintain existing layout structure and spacing
  - _Requirements: 5.1, 5.2_

- [x] 6. Clean up LandingPage component
  - Remove unused component imports (MainContent, TrustedBy, Features, PopularMarkets, FAQ, Footer)
  - Update background color to use zinc theme variable
  - Verify component renders correctly
  - _Requirements: 6.1_

- [x] 7. Final testing and validation
  - [x] 7.1 Visual QA across viewports
    - Test on mobile viewport (320px - 768px)
    - Test on tablet viewport (768px - 1024px)
    - Test on desktop viewport (1024px+)
    - Verify all components render with correct styling
    - _Requirements: 6.4_

  - [x] 7.2 Functional testing
    - Test wallet connection flow
    - Test wallet disconnect flow
    - Test header scroll behavior
    - Test all button interactions
    - Test dropdown menu interactions
    - _Requirements: 6.2, 6.3_

  - [x] 7.3 Accessibility validation
    - Test keyboard navigation through all interactive elements
    - Verify focus indicators are visible
    - Check ARIA labels and semantic HTML
    - Validate color contrast meets WCAG AA standards
    - _Requirements: 5.3_

  - [x] 7.4 Browser compatibility check
    - Test in Chrome/Edge
    - Test in Firefox
    - Test in Safari
    - _Requirements: 6.1, 6.4_

  - [x] 7.5 Performance validation
    - Check bundle size impact
    - Verify no runtime performance degradation
    - Validate CSS variables load correctly
    - _Requirements: 6.1_
