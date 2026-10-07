# Cart Royal Admin 👑

An enterprise-grade administration portal and multi-role product catalog management system built for the **Cart Royal** e-commerce ecosystem.

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-blueviolet?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 📌 Table of Contents
- [What The Product Does](#-what-the-product-does)
- [The Problem It Solves](#-the-problem-it-solves)
- [My Specific Contribution](#-my-specific-contribution)
- [Architecture](#-architecture)
- [Technologies Used](#-technologies-used)
- [Important Technical Decisions](#-important-technical-decisions)
- [Key Features](#-key-features)
- [System Previews & Screenshots](#-system-previews--screenshots)
- [Live Demo & Access](#-live-demo--access)
- [Challenges & Solutions](#-challenges--solutions)
- [What Makes This Project Technically Interesting](#-what-makes-this-project-technically-interesting)
- [Setup & Installation Instructions](#-setup--installation-instructions)

---

## 💡 What The Product Does

**Cart Royal Admin** serves as the central control plane for managing the product catalog, vendor inventory, administrative access control, and quality assurance workflows across the Cart Royal platform. 

It provides store administrators and super-administrators with intuitive tools to:
- Create, manage, and draft product listings with rich metadata (SKU, price, stock, description, and multi-category tagging).
- Moderating product submissions through a multi-stage status workflow (**Draft** ➔ **Pending Approval** ➔ **Approved** / **Rejected**).
- Directly upload high-resolution digital product media to Cloudinary CDN with browser-based drag-and-drop mechanics.
- Oversee system activity logs, track administrative metrics, and manage admin team permissions (`SUPER_ADMIN` vs `ADMIN`).

---

## 🎯 The Problem It Solves

Multi-vendor and multi-administrator e-commerce platforms frequently face critical operational challenges:
1. **Catalog Chaos & Unverified Product Listings**: Direct product publishes without moderation lead to inaccurate pricing, improper categorization, or low-quality product images appearing on customer-facing storefronts.
2. **Server Performance Degradation During Media Uploads**: Routing multi-megabyte image payloads through application backend servers causes HTTP request bottlenecks, high bandwidth consumption, and server memory spikes.
3. **Lack of Granular Access Controls**: Allowing all administrative accounts total system access increases security risks and risks accidental data corruption or unauthorized admin creation.

**Cart Royal Admin solves these pain points** by enforcing a strict moderation lifecycle for products, implementing serverless signed direct-to-Cloudinary image uploads, and establishing dynamic role-based access control (RBAC).

---

## 🛠️ My Specific Contribution

As the lead developer on this application, I architected and implemented the core administrative frontend codebase:
- **Modular Frontend Architecture**: Engineered the application using Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS v4.
- **Role-Based UI & Navigation System**: Designed [`components/dashboard-layout.tsx`](file:///c:/Users/Daniel/Work/cart-royal-admin/components/dashboard-layout.tsx) with adaptive sidebars that dynamically render actions and views based on session privileges (`SUPER_ADMIN` vs `ADMIN`).
- **Direct Cloudinary Upload Pipeline**: Authored [`lib/cloudinary.ts`](file:///c:/Users/Daniel/Work/cart-royal-admin/lib/cloudinary.ts) and [`components/product-image-upload.tsx`](file:///c:/Users/Daniel/Work/cart-royal-admin/components/product-image-upload.tsx) to generate short-lived HMAC request signatures and process direct client-to-Cloudinary uploads with live upload progress feedback.
- **Product Management & Form Workflows**: Developed [`components/product-form.tsx`](file:///c:/Users/Daniel/Work/cart-royal-admin/components/product-form.tsx), [`components/category-selector.tsx`](file:///c:/Users/Daniel/Work/cart-royal-admin/components/category-selector.tsx), and [`components/product-table.tsx`](file:///c:/Users/Daniel/Work/cart-royal-admin/components/product-table.tsx) to provide smooth drafting, editing, category tagging, and batch management.
- **Admin Management & Access Control**: Built [`components/admin-table.tsx`](file:///c:/Users/Daniel/Work/cart-royal-admin/components/admin-table.tsx) and [`components/create-admin-dialog.tsx`](file:///c:/Users/Daniel/Work/cart-royal-admin/components/create-admin-dialog.tsx) enabling Super Admins to invite and configure admin accounts.
- **Security Engineering**: Integrated CSRF token utilities ([`lib/csrf.ts`](file:///c:/Users/Daniel/Work/cart-royal-admin/lib/csrf.ts)), typed data boundaries ([`types/index.d.ts`](file:///c:/Users/Daniel/Work/cart-royal-admin/types/index.d.ts)), and bcrypt integration setup.

---

## 🏗️ Architecture

The application adopts a clean, layered architecture emphasizing performance, type safety, and separation of concerns.

```mermaid
graph TD
    User["👨‍💼 Admin / Super Admin"] -->|HTTP / React 19 UI| Layout["📱 Dashboard Layout Guard"]
    
    subgraph "Next.js 15 App Router (Frontend Control Plane)"
        Layout --> Dashboard["📊 Dashboard Overview (/admin)"]
        Layout --> ProductMgmt["🛍️ Product Management (/admin/products)"]
        Layout --> AdminMgmt["👥 Admin Management (/admin/admins)"]
        
        ProductForm["📝 Product Form Component"] --> CatSelector["🏷️ Category Selector"]
        ProductForm --> ImageUploader["📸 Image Upload (Dropzone)"]
    end

    subgraph "Backend Services & Storage Pipeline"
        ImageUploader -->|1. Request Upload Signature| SignApi["🔐 Signature API Endpoint"]
        SignApi -->|2. Return HMAC Signature| ImageUploader
        ImageUploader -->|3. Direct Binary Upload| Cloudinary["☁️ Cloudinary CDN"]
        Cloudinary -->|4. Return CDN Image URL| ProductForm
        ProductForm -->|5. Submit Product Metadata| CoreAPI["📡 Cart Royal Core API / DB"]
    end
```

### Layer Organization
- **`app/`**: Next.js 15 App Router pages, layout wrappers, and route groups (`/admin`, `/admin/products`, `/admin/admins`, `/admin/settings`, `/admin/login`).
- **`components/`**: Reusable visual components built on Radix UI primitives (`DashboardLayout`, `ProductForm`, `ProductImageUpload`, `AdminTable`, `CategorySelector`).
- **`components/ui/`**: Atomic UI primitives (Button, Card, Dialog, Table, Badge, DropdownMenu, Sheet, Input, Textarea, Avatar).
- **`lib/`**: Business logic, API connectors (`api.ts`), Cloudinary signature generators (`cloudinary.ts`), CSRF protection (`csrf.ts`), and helper utilities (`utils.ts`).
- **`types/`**: Strict TypeScript declarations (`Product`, `Admin`, `ProductImage`, `ActivityLog`, `Category`).
- **`constants/`**: Fixed system configurations, category metadata lists, and status enums.

---

## 🛠️ Technologies Used

| Category | Technology | Usage Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 15.4 (App Router) | Server components, client interactivity, Turbopack HMR |
| **UI Core** | React 19 | Modern functional components, hooks, concurrent features |
| **Language** | TypeScript 5 | End-to-end static typing for state, props, and API schemas |
| **Styling** | Tailwind CSS v4 & `@tailwindcss/postcss` | Utility-first responsive design, dark/light themes |
| **Primitives** | Radix UI (`@radix-ui/react-*`) | Accessible headless UI components (Dialog, Dropdown, Sheet, Tabs) |
| **Icons & Media** | FontAwesome & Lucide React | Clean, intuitive administrative icons |
| **Media Delivery** | Cloudinary & `react-dropzone` | Drag-and-drop client uploads, signed HMAC direct media delivery |
| **Form Management** | React Hook Form & Zod | Form state control and schema-based runtime validation |
| **HTTP Client** | Axios | Async API request orchestration and upload progress monitoring |
| **Database Readiness**| Prisma ORM (`prisma`) | Database schema management & type generation |
| **Auth & Security** | `bcryptjs` & HttpOnly Cookies | Password hashing and CSRF token protection |

---

## 🧠 Important Technical Decisions

### 1. Direct-to-Cloudinary Uploads with Server-Signed HMAC Requests
- **Context**: Product images require high bandwidth, multiple file uploads per product, and immediate image transformations.
- **Decision**: Rather than streaming large binary files through the Next.js server, the backend generates short-lived HMAC signatures ([`generateUploadSignature`](file:///c:/Users/Daniel/Work/cart-royal-admin/lib/cloudinary.ts#L10-L31)). The browser uploads media directly to Cloudinary's REST API endpoint.
- **Benefit**: Eliminates server memory bottlenecks, drastically lowers infrastructure bandwidth costs, and enables real-time upload progress bars on the client.

### 2. Multi-Stage Product Moderation Workflow
- **Context**: Ensuring high catalog quality while empowering multi-tier administration.
- **Decision**: Implemented an explicit state machine for products:
  $$\text{Draft} \longrightarrow \text{Pending Approval} \longrightarrow \begin{cases} \text{Approved (Live)} \\ \text{Rejected} \end{cases}$$
- **Benefit**: Standard Admins can draft and submit items, but only Super Admins possess approval rights. This prevents unauthorized listings from appearing on the customer platform.

### 3. Accessible Headless Primitives + Custom Tailwind CSS v4 Styling
- **Context**: Admin panels need clean visual hierarchies, responsiveness, and total keyboard accessibility.
- **Decision**: Paired headless Radix UI primitives with Tailwind CSS v4 utility classes instead of monolithic heavy UI frameworks.
- **Benefit**: Zero unneeded runtime bundle overhead, complete style customization, full screen-reader compliance, and keyboard navigation support out of the box.

---

## ✨ Key Features

- 📊 **Executive Overview Dashboard**: High-level telemetry card metrics displaying total product counts, pending approval queues, live product tallies, active admins, and real-time audit logs.
- 🛍️ **Comprehensive Catalog Management**: Add, edit, filter, and review products with price, SKU, stock level, category tags, and rich descriptions.
- 🛡️ **Super Admin Approval Center**: Dedicated review dashboard for Super Admins to inspect submitted products, approve compliant items, or reject non-conforming listings.
- 📸 **Drag-and-Drop Cloudinary Media Uploader**: Interactive image manager supporting JPEG/PNG/WebP formats, 10MB limits, primary image toggles, and deletion.
- 🏷️ **Dynamic Multi-Category Selector**: Fast visual tagging component supporting multi-select categories (Electronics, Men, Women, Health & Beauty, Automobiles, etc.).
- 👥 **Admin Team Access & RBAC Controls**: Super Admin interface for creating admin accounts, assigning roles (`SUPER_ADMIN` / `ADMIN`), monitoring last login timestamps, and toggling user status (`ACTIVE` / `INACTIVE`).
- 🔒 **Enterprise Security Protocols**: Prepared HttpOnly CSRF cookie verification, secure password hashing, and dynamic role route authorization.

---

## 🖼️ System Previews & Screenshots

### Administrative Interface Layout
```
+-----------------------------------------------------------------------------------+
|  👑 Cart Royal Admin                             [Search...]         (A) Admin v  |
+-------------------+---------------------------------------------------------------+
| 📊 Dashboard      | Welcome back, Admin                                           |
| 🛍️ My Products    | +------------------+ +------------------+ +-----------------+ |
| 📦 All Products   | | Total Products   | | Pending Review   | | Approved Items  | |
| ⏳ Pending Review | |       125        | |        12        | |       113       | |
| ➕ Add Product    | +------------------+ +------------------+ +-----------------+ |
| 👥 Manage Admins  |                                                               |
| 📜 Activity Logs  | 🛍️ Product Catalog Overview                                   |
| ⚙️ Settings       | +-----------------------------------------------------------+ |
|                   | | Name                  | Status     | Price   | Stock | ... | |
|                   | |-----------------------+------------+---------+-------+-----| |
|                   | | Leather Watch         | APPROVED   | $499.99 |   15  | edit| |
|                   | | Bluetooth Headphones  | PENDING    | $199.99 |   30  | edit| |
|                   | +-----------------------------------------------------------+ |
+-------------------+---------------------------------------------------------------+
```

---

## 🌐 Live Demo & Access

- **Local Development URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Staging / Production Deployment**: Ready for zero-config deployment on Vercel or Docker containers.

---

## 🏋️ Challenges & Solutions

| Challenge | Root Cause | Engineering Solution |
| :--- | :--- | :--- |
| **Server Timeout & Memory Surges During Bulk Image Uploads** | Streaming raw image buffers through server route handlers consumes server RAM & CPU cycles. | Implemented Cloudinary HMAC signed request tokens. The browser streams directly to Cloudinary CDN, bypassing application server memory entirely. |
| **Hydration Mismatches in Dynamic Role Rendering** | Role state evaluated differently between SSR and Client components causing layout pop-in. | Encapsulated role evaluation inside centralized layout components ([`DashboardLayout`](file:///c:/Users/Daniel/Work/cart-royal-admin/components/dashboard-layout.tsx)) with unified session fallbacks. |
| **Multi-Category Tagging Complexity** | Managing multi-select arrays cleanly while reflecting dynamic UI badge toggles. | Created an isolated [`CategorySelector`](file:///c:/Users/Daniel/Work/cart-royal-admin/components/category-selector.tsx) component using reactive state hooks and clean badge chip interactions. |

---

## ⚡ What Makes This Project Technically Interesting

1. **Decoupled Serverless Asset Streaming**: Utilizing Cloudinary API signatures allows browser clients to execute high-volume media uploads securely without placing load on backend node instances.
2. **Enterprise Catalog Governance**: Enforces a strict moderation pipeline, making it impossible for standard administrative users to inject unverified listings into the public e-commerce store.
3. **Next.js 15 Turbopack Architecture**: Harnesses Next.js 15 App Router with Turbopack for ultra-responsive Hot Module Replacement (HMR) and optimized Server-Driven Component trees.
4. **Resilient Type Safety**: Full TypeScript integration guarantees type safety across data contracts, UI properties, and status transition workflows.

---

## ⚙️ Setup & Installation Instructions

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm** / **yarn** / **pnpm** / **bun**

### 1. Clone the Repository
```bash
git clone https://github.com/Hayotunday/cart-royal-admin.git
cd cart-royal-admin
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Database Configuration (Optional / Prisma Integration)
DATABASE_URL="postgresql://user:password@localhost:5432/cart_royal_db?schema=public"

# Node Environment
NODE_ENV=development
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000/admin](http://localhost:3000/admin) in your browser to access the administration portal.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📝 License
This project is proprietary and confidential software developed for **Cart Royal**.

