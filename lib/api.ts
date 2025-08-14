const admins: Admin[] = [
  {
    id: "1",
    username: "superadmin",
    email: "super@example.com",
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "2",
    username: "admin_user",
    email: "admin@example.com",
    role: "ADMIN",
    status: "ACTIVE",
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "3",
    username: "inactive_user",
    email: "inactive@example.com",
    role: "ADMIN",
    status: "INACTIVE",
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
];

const products: Product[] = [
  {
    id: "prod_1",
    name: "Luxury Leather Watch",
    description:
      "Experience timeless elegance with this handcrafted leather watch. Featuring a sapphire crystal face and Swiss movement, it's the pinnacle of style and precision.",
    price: 499.99,
    sku: "LW-001",
    stock: 15,
    status: "APPROVED",
    images: [
      {
        id: "img_1",
        cloudinaryUrl: "https://placehold.co/600x400/000000/FFFFFF",
        cloudinaryPublicId: "sample_id_1",
        isPrimary: true,
        productId: "prod_1",
      },
    ],
    categories: ["cat_1"],
    adminId: "1",
    admin: admins[0],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_2",
    name: "Wireless Bluetooth Headphones",
    description:
      "Immerse yourself in high-fidelity sound with these noise-cancelling wireless headphones. Up to 40 hours of battery life.",
    price: 199.99,
    sku: "HD-002",
    stock: 30,
    status: "PENDING_APPROVAL",
    images: [],
    categories: ["cat_2"],
    adminId: "2",
    admin: admins[1],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export async function getProducts(
  status?: Product["status"]
): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  if (status) {
    return products.filter((p) => p.status === status);
  }
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return products.find((p) => p.id === id);
}

export async function getAdmins(): Promise<Admin[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return admins;
}

export async function getSession() {
  return { user: { id: "1", name: "Super Admin", role: "SUPER_ADMIN" } };
}

export async function createAdmin(data: {
  username: string;
  email: string;
  role: Admin["role"];
}): Promise<Admin> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const newAdmin: Admin = {
    id: `admin_${admins.length + 1}`,
    ...data,
    status: "ACTIVE",
    lastLogin: new Date().toISOString(),
  };
  admins.push(newAdmin);
  return newAdmin;
}
