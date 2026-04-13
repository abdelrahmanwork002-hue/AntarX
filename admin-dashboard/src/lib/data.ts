import { supabase } from './supabase';

export interface Inquiry {
    id: string;
    event_type: string;
    event_date: string;
    guest_count: number;
    location: string;
    notes?: string;
    status: 'pending' | 'reviewed' | 'completed';
    created_at: string;
}

const MOCK_INQUIRIES: Inquiry[] = [
    { id: '1', event_type: 'Wedding', event_date: '2026-06-15', guest_count: 150, location: 'Riyadh', status: 'pending', created_at: new Date().toISOString() },
    { id: '2', event_type: 'Corporate', event_date: '2026-07-20', guest_count: 50, location: 'Jeddah', status: 'reviewed', created_at: new Date().toISOString() }
];

export async function getInquiries(): Promise<Inquiry[]> {
    try {
        const { data, error } = await supabase
            .from('event_inquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Inquiry[];
    } catch (err) {
        console.warn('Using mock inquiries as Supabase is unreachable');
        return MOCK_INQUIRIES;
    }
}

export async function getProducts() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('name_en', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (err) {
        return [];
    }
}

export async function getOrders() {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                profiles(full_name),
                order_items(
                    id,
                    quantity,
                    price_at_purchase,
                    products(name_en)
                )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (err) {
        return [];
    }
}

export async function updateOrderStatus(id: string, status: string) {
    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select();

    if (error) throw error;
    return data[0];
}

export async function updateInquiryStatus(id: string, status: Inquiry['status']) {
    const { data, error } = await supabase
        .from('event_inquiries')
        .update({ status })
        .eq('id', id)
        .select();

    if (error) throw error;
    return data[0];
}

export async function createProduct(product: any) {
    const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();

    if (error) throw error;
    return data[0];
}
