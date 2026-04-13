import { supabase } from './supabase';

export interface Product {
    id: string;
    name_en: string;
    name_ar: string;
    category: 'juice' | 'dessert';
    price: number;
    image: string | null;
    description_en: string;
    description_ar: string;
    calories: number | null;
    stock: number;
}

export interface Inquiry {
    id?: string;
    event_type: string;
    event_date: string;
    guest_count: number;
    location: string;
    notes?: string;
    status?: 'pending' | 'reviewed' | 'completed';
    created_at?: string;
}

export const mockProducts: Product[] = [
    {
        id: '1',
        name_en: 'Emerald Revive',
        name_ar: 'إيميرالد ريفايف',
        category: 'juice',
        price: 25.00,
        image: '/products/juice-1.jpg',
        description_en: 'Pure cold-pressed spinach, green apple, and ginger.',
        description_ar: 'عصير سبانخ نقي معصور ببارد، تفاح أخضر وزنجبيل.',
        calories: 120,
        stock: 50
    },
    {
        id: '1',
        name_en: 'Golden Glow',
        name_ar: 'الوهج الذهبي',
        category: 'juice',
        price: 22.00,
        image: '/products/juice-2.jpg',
        description_en: 'Refreshing orange, turmeric, and black pepper.',
        description_ar: 'برتقال منعش، كركم وفلفل أسود.',
        calories: 145,
        stock: 45
    },
];

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error('Error fetching products:', error);
        return mockProducts; // Fallback to mock data on error
    }

    return data as Product[];
}

export async function submitInquiry(inquiry: Omit<Inquiry, 'id' | 'status' | 'created_at'>) {
    const { data, error } = await supabase
        .from('event_inquiries')
        .insert([inquiry])
        .select();

    if (error) {
        throw error;
    }
    return data[0];
}

export async function createOrder(userId: string | null, total: number, items: any[]) {
    // 1. Create the order
    const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{ 
            user_id: userId, 
            total_amount: total, 
            status: 'pending' 
        }])
        .select();

    if (orderError) throw orderError;
    const orderId = orderData[0].id;

    // 2. Create order items
    const orderItems = items.map(item => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price
    }));

    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

    if (itemsError) throw itemsError;

    return orderData[0];
}
