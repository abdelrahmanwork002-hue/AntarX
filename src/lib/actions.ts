'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mock';

export async function login(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (username === 'admin' && password === '0000') {
    (await cookies()).set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    return { success: true };
  }

  return { success: false, error: 'Invalid credentials' };
}

export async function logout() {
  (await cookies()).delete('admin_session');
  redirect('/');
}

export async function isAuthenticated() {
  const session = (await cookies()).get('admin_session');
  return session?.value === 'true';
}

// B2B Request Schema
const B2BRequestSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  phone: z.string().min(8, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  businessType: z.string(),
  orderDetails: z.string().min(10, "Please provide more details about your order"),
  deliveryDate: z.string().optional(),
  location: z.string().optional(),
});

export async function submitB2BRequest(formData: FormData) {
  const rawData = {
    businessName: formData.get('businessName'),
    contactPerson: formData.get('contactPerson'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    businessType: formData.get('businessType'),
    orderDetails: formData.get('orderDetails'),
    deliveryDate: formData.get('deliveryDate'),
    location: formData.get('location'),
  };

  const validatedData = B2BRequestSchema.parse(rawData);

  try {
    await prisma.b2BRequest.create({
      data: validatedData,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to submit B2B request:', error);
    return { success: false, error: "Failed to submit request. Please try again later." };
  }
}

export async function getProducts(type?: 'fresh' | 'ready') {
  try {
    const products = await prisma.product.findMany({
      where: {
        visible: true,
        ...(type ? { type } : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return products;
  } catch (error) {
    console.error('Failed to fetch products, falling back to mock data:', error);
    return MOCK_PRODUCTS.filter(p => !type || p.type === type);
  }
}

export async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return posts;
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
        published: true,
      },
    });
    return post;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
}

export async function createProduct(formData: FormData) {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");

  const data = {
    nameAr: formData.get('nameAr') as string,
    nameEn: formData.get('nameEn') as string,
    descriptionAr: formData.get('descriptionAr') as string,
    descriptionEn: formData.get('descriptionEn') as string,
    price: parseFloat(formData.get('price') as string),
    type: formData.get('type') as string,
    category: formData.get('category') as string,
    images: (formData.get('images') as string)?.split(',').map(s => s.trim()).filter(s => s) || [],
    visible: formData.get('visible') === 'on',
  };

  try {
    await prisma.product.create({ data });
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Failed to create product:', error);
    return { success: false, error: 'Failed to create product' };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");

  const data = {
    nameAr: formData.get('nameAr') as string,
    nameEn: formData.get('nameEn') as string,
    descriptionAr: formData.get('descriptionAr') as string,
    descriptionEn: formData.get('descriptionEn') as string,
    price: parseFloat(formData.get('price') as string),
    type: formData.get('type') as string,
    category: formData.get('category') as string,
    images: (formData.get('images') as string)?.split(',').map(s => s.trim()).filter(s => s) || [],
    visible: formData.get('visible') === 'on',
  };

  try {
    await prisma.product.update({
      where: { id },
      data,
    });
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Failed to update product:', error);
    return { success: false, error: 'Failed to update product' };
  }
}

export async function deleteProduct(id: string) {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");

  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete product:', error);
    return { success: false, error: 'Failed to delete product' };
  }
}

export async function toggleProductVisibility(id: string, visible: boolean) {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");

  try {
    await prisma.product.update({
      where: { id },
      data: { visible },
    });
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Failed to toggle visibility:', error);
    return { success: false, error: 'Failed to update visibility' };
  }
}
