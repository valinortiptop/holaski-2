CREATE TABLE IF NOT EXISTS public.resorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    region TEXT NOT NULL,
    country TEXT NOT NULL,
    altitude_top INTEGER,
    altitude_base INTEGER,
    runs_total INTEGER,
    lifts_total INTEGER,
    difficulty_json JSONB,
    description TEXT,
    price_level INTEGER DEFAULT 1,
    image_url TEXT,
    gallery_urls TEXT[],
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.newsletter_subs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    destination TEXT,
    travel_dates TEXT,
    passengers_adults INTEGER DEFAULT 1,
    passengers_children INTEGER DEFAULT 0,
    skill_level TEXT,
    budget_range TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.resorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view resorts" ON public.resorts FOR SELECT TO public USING (true);
CREATE POLICY "Public can subscribe" ON public.newsletter_subs FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public can submit leads" ON public.leads FOR INSERT TO public WITH CHECK (true);