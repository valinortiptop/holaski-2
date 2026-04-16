-- Update North American resort images using the slug-based lookup on the resorts table
-- Using Gemini generated assets from public-assets bucket

UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/vail.webp' WHERE slug = 'vail';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/aspen-snowmass.webp' WHERE slug = 'aspen-snowmass';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/whistler-blackcomb.webp' WHERE slug = 'whistler-blackcomb';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/park-city.webp' WHERE slug = 'park-city';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/breckenridge.webp' WHERE slug = 'breckenridge';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/jackson-hole.webp' WHERE slug = 'jackson-hole';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/lake-louise.webp' WHERE slug = 'lake-louise';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/mammoth-mountain.webp' WHERE slug = 'mammoth-mountain';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/big-sky.webp' WHERE slug = 'big-sky';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/palisades-tahoe.webp' WHERE slug = 'palisades-tahoe';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/banff-sunshine.webp' WHERE slug = 'banff-sunshine';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/revelstoke.webp' WHERE slug = 'revelstoke';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/telluride.webp' WHERE slug = 'telluride';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/deer-valley.webp' WHERE slug = 'deer-valley';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/steamboat.webp' WHERE slug = 'steamboat';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/snowbird.webp' WHERE slug = 'snowbird';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/alta.webp' WHERE slug = 'alta';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/heavenly.webp' WHERE slug = 'heavenly';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/copper-mountain.webp' WHERE slug = 'copper-mountain';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/keystone.webp' WHERE slug = 'keystone';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/winter-park.webp' WHERE slug = 'winter-park';
UPDATE resorts SET image_url = 'https://kmehmrtrktgqdiafitkv.supabase.co/storage/v1/object/public/public-assets/resort-images/beaver-creek.webp' WHERE slug = 'beaver-creek';

-- Apply cache busting
UPDATE resorts SET image_url = image_url || '?v=2' WHERE slug IN (
    'vail', 'aspen-snowmass', 'whistler-blackcomb', 'park-city', 'breckenridge', 
    'jackson-hole', 'lake-louise', 'mammoth-mountain', 'big-sky', 'palisades-tahoe',
    'banff-sunshine', 'revelstoke', 'telluride', 'deer-valley', 'steamboat',
    'snowbird', 'alta', 'heavenly', 'copper-mountain', 'keystone', 'winter-park', 'beaver-creek'
);