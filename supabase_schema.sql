-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  price DECIMAL(10, 2) NOT NULL,
  type TEXT CHECK (type IN ('fresh', 'ready')),
  category TEXT, -- e.g., 'traditional', 'blended', 'seasonal'
  images TEXT[], -- Array of image URLs
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create B2B requests table
CREATE TABLE b2b_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  business_type TEXT NOT NULL, -- e.g., 'Gym', 'Cafe', 'Restaurant', 'Event Organizer', 'Other'
  order_details TEXT NOT NULL,
  delivery_date DATE,
  location TEXT,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  featured_image TEXT,
  category TEXT,
  tags TEXT[],
  seo_title TEXT,
  seo_meta TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact messages table (optional but useful)
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site_settings table
CREATE TABLE site_settings (
  id TEXT PRIMARY KEY, -- e.g., 'global_config'
  logo_url TEXT,
  primary_color TEXT,
  contact_email TEXT,
  whatsapp_number TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and setup initial policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for products and blog posts
CREATE POLICY "Allow public read on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read on blog_posts" ON blog_posts FOR SELECT USING (published = true);

-- Allow public to insert B2B requests and contact messages
CREATE POLICY "Allow public insert on b2b_requests" ON b2b_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Admin policies (assuming role 'service_role' or specific admin users)
-- These will be more detailed once auth is setup
