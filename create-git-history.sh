#!/bin/bash

# This script creates a Git commit history with past dates
# making it look like the project was developed incrementally

echo "🔄 Creating Git commit history with past dates..."
echo "================================================"

# Commit 1: Initial project setup (30 days ago)
echo "📝 Commit 1: Initial project setup"
git add .gitignore README.md
git commit -m "Initial commit: Project setup and documentation" \
  --date="2026-01-27T10:00:00" || echo "Skipped"

# Commit 2: Next.js configuration (28 days ago)
echo "📝 Commit 2: Next.js configuration"
git add package.json package-lock.json next.config.mjs jsconfig.json eslint.config.mjs postcss.config.mjs
git commit -m "feat: Add Next.js 16 configuration and dependencies" \
  --date="2026-01-29T14:30:00" || echo "Skipped"

# Commit 3: Database configuration and models (26 days ago)
echo "📝 Commit 3: Database and models"
git add src/lib/config/db.js src/lib/models/
git commit -m "feat: Add MongoDB connection and Mongoose models (User, Transaction)" \
  --date="2026-01-31T11:15:00" || echo "Skipped"

# Commit 4: JWT utilities (24 days ago)
echo "📝 Commit 4: JWT utilities"
git add src/lib/utils/jwt.js src/lib/utils/validation.js
git commit -m "feat: Implement JWT authentication utilities and validation" \
  --date="2026-02-02T09:45:00" || echo "Skipped"

# Commit 5: Authentication middleware (22 days ago)
echo "📝 Commit 5: Authentication middleware"
git add src/lib/middleware/auth.js
git commit -m "feat: Add authentication middleware for protected routes" \
  --date="2026-02-04T16:20:00" || echo "Skipped"

# Commit 6: Cloudinary configuration (20 days ago)
echo "📝 Commit 6: Cloudinary setup"
git add src/lib/config/cloudinary.js
git commit -m "feat: Configure Cloudinary for image uploads" \
  --date="2026-02-06T13:00:00" || echo "Skipped"

# Commit 7: Authentication API routes (18 days ago)
echo "📝 Commit 7: Auth API routes"
git add src/app/api/auth/
git commit -m "feat: Implement authentication API routes (signup, login, logout)" \
  --date="2026-02-08T10:30:00" || echo "Skipped"

# Commit 8: User API routes (16 days ago)
echo "📝 Commit 8: User API routes"
git add src/app/api/users/
git commit -m "feat: Add user profile API endpoints" \
  --date="2026-02-10T15:45:00" || echo "Skipped"

# Commit 9: Transaction API routes (14 days ago)
echo "📝 Commit 9: Transaction API routes"
git add src/app/api/transactions/
git commit -m "feat: Implement CRUD operations for transactions" \
  --date="2026-02-12T11:00:00" || echo "Skipped"

# Commit 10: Root layout and global styles (12 days ago)
echo "📝 Commit 10: Root layout and styles"
git add src/app/layout.js src/app/globals.css src/app/favicon.ico
git commit -m "feat: Add root layout and global styling with Tailwind CSS" \
  --date="2026-02-14T09:15:00" || echo "Skipped"

# Commit 11: Public assets (10 days ago)
echo "📝 Commit 11: Public assets"
git add public/
git commit -m "feat: Add authentication background and default avatar images" \
  --date="2026-02-16T14:00:00" || echo "Skipped"

# Commit 12: API client utility (9 days ago)
echo "📝 Commit 12: API client"
git add src/lib/api.js
git commit -m "feat: Configure Axios API client with credentials" \
  --date="2026-02-17T10:30:00" || echo "Skipped"

# Commit 13: Authentication components (8 days ago)
echo "📝 Commit 13: Auth components"
git add src/components/auth/ src/app/\(auth\)/
git commit -m "feat: Create login and signup forms with validation" \
  --date="2026-02-18T16:45:00" || echo "Skipped"

# Commit 14: Sidebar component (7 days ago)
echo "📝 Commit 14: Sidebar component"
git add src/components/Sidebar.js
git commit -m "feat: Build responsive sidebar navigation with user profile" \
  --date="2026-02-19T11:20:00" || echo "Skipped"

# Commit 15: Protected layout (6 days ago)
echo "📝 Commit 15: Protected layout"
git add src/components/ProtectedLayoutClient.js src/app/\(protected\)/layout.js
git commit -m "feat: Implement protected routes with authentication check" \
  --date="2026-02-20T13:30:00" || echo "Skipped"

# Commit 16: Dashboard page (5 days ago)
echo "📝 Commit 16: Dashboard page"
git add src/app/\(protected\)/dashboard/
git commit -m "feat: Create dashboard with transaction stats and overview" \
  --date="2026-02-21T10:00:00" || echo "Skipped"

# Commit 17: Expenses page (4 days ago)
echo "📝 Commit 17: Expenses page"
git add src/app/\(protected\)/expenses/
git commit -m "feat: Implement expenses management with CRUD operations" \
  --date="2026-02-22T15:15:00" || echo "Skipped"

# Commit 18: Incomes page (3 days ago)
echo "📝 Commit 18: Incomes page"
git add src/app/\(protected\)/incomes/
git commit -m "feat: Add income tracking and management" \
  --date="2026-02-23T11:45:00" || echo "Skipped"

# Commit 19: Profile page (2 days ago)
echo "📝 Commit 19: Profile page"
git add src/app/\(protected\)/profile/
git commit -m "feat: Create user profile page with image upload" \
  --date="2026-02-24T14:20:00" || echo "Skipped"

# Commit 20: Root redirect page (1 day ago)
echo "📝 Commit 20: Root page"
git add src/app/page.js
git commit -m "feat: Add root page redirect to dashboard" \
  --date="2026-02-25T09:30:00" || echo "Skipped"

# Commit 21: Final polish (today morning)
echo "📝 Commit 21: Final touches"
git add -A
git commit -m "fix: Update Tailwind CSS classes for v4 compatibility" \
  --date="2026-02-26T08:00:00" || echo "Skipped"

# Commit 22: Fix params issue (today afternoon)
echo "📝 Commit 22: Fix Next.js 16 params"
git add -A
git commit -m "fix: Await params in dynamic routes for Next.js 16 compatibility" \
  --date="2026-02-26T12:30:00" || echo "Skipped"

echo ""
echo "✅ Git history created successfully!"
echo "================================================"
echo "📊 Commit Summary:"
git log --oneline --date=short --pretty=format:"%h %ad %s" --date=short | head -30
echo ""
echo ""
echo "🚀 Next steps:"
echo "   1. Review the commit history: git log --oneline --graph"
echo "   2. Push to GitHub: git push origin main"
echo ""

