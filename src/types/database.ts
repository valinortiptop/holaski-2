// @ts-nocheck
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Resort {
  id: string;
  slug: string;
  name: string;
  region: string;
  country: string;
  altitude_top: number | null;
  altitude_base: number | null;
  runs_total: number | null;
  lifts_total: number | null;
  difficulty_json: {
    principiante: number;
    intermedio: number;
    avanzado: number;
    experto: number;
  };
  description: string | null;
  price_level: number;
  image_url: string | null;
  gallery_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      resorts: {
        Row: Resort;
        Insert: Omit<Resort, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Resort, 'id' | 'created_at' | 'updated_at'>>;
      };
      leads: {
        Row: {
          id: string;
          created_at: string;
          first_name: string | null;
          email: string;
          destination: string | null;
          travel_dates: string | null;
          passengers_adults: number | null;
          passengers_children: number | null;
          skill_level: string | null;
          budget_range: string | null;
          message: string | null;
          status: string;
        };
      };
    };
  };
}

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          700: '#1E293B',
          800: '#111827',
          900: '#0B1628',
          950: '#070D19',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};