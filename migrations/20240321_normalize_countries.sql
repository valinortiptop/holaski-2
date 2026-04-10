-- migrations/20240321_normalize_countries.sql
UPDATE resorts SET country = 'EE.UU.' WHERE country IN ('USA', 'United States', 'Estados Unidos', 'EEUU');
UPDATE resorts SET country = 'Canadá' WHERE country IN ('Canada');
UPDATE resorts SET country = 'Francia' WHERE country IN ('France');
UPDATE resorts SET country = 'Suiza' WHERE country IN ('Switzerland');
UPDATE resorts SET country = 'Italia' WHERE country IN ('Italy');
UPDATE resorts SET country = 'España' WHERE country IN ('Spain');
UPDATE resorts SET country = 'Japón' WHERE country IN ('Japan');
UPDATE resorts SET country = 'Noruega' WHERE country IN ('Norway');
UPDATE resorts SET country = 'Suecia' WHERE country IN ('Sweden');