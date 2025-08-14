// type ActivityLog = {
//   id: string; // UUID primary key
//   adminId: string; // Foreign key to Admins
//   action: string; // Description of action
//   entityType: string; // Type of entity affected (e.g., "product", "admin")
//   entityId: string; // ID of affected entity
//   details: string; // JSON string with additional details
//   timestamp: Date; // When action occurred
//   ipAddress: string; // IP address of admin
// };

type ActivityAction =
  | "create"
  | "update"
  | "delete"
  | "approve"
  | "reject"
  | "submit";

type ProductStatus = "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "REJECTED";

type AdminRole = "ADMIN" | "SUPER_ADMIN";

type AdminStatus = "ACTIVE" | "INACTIVE";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  status: ProductStatus;
  images: ProductImage[];
  categories: string[]; // array of category ids
  adminId: string;
  admin?: Admin; // Optional creator info
  createdAt: string;
  updatedAt: string;
};

type ProductImage = {
  id: string;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  isPrimary: boolean;
  productId: string;
};

type Admin = {
  id: string;
  username: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  lastLogin: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

type ActivityLog = {
  id: string;
  action: ActivityAction;
  entityType: string;
  timestamp: string; // ISO 8601 date string
  admin: {
    username: string;
  };
};
