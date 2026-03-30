// @ts-nocheck
// src/components/Footer.tsx
import { Mountain, Mail, Phone, MapPin } from 'lucide-react';
import { useApp } from '../App';

export default function Footer() {
  const { tr } = useApp();
  return (
    <footer className="bg-slate-900 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-6 h-6 text-cyan-400" />
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">HolaSki</span>
            </div>
            <p className="text-sm text-white/50">Tu plataforma todo-en-uno para planificar el viaje de esquí perfecto desde Latinoamérica.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Links</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="/wizard" className="hover:text-white transition-colors">{tr('nav.wizard')}</a></li>
              <li><a href="/resorts" className="hover:text-white transition-colors">{tr('nav.resorts')}</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">{tr('nav.dash')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">{tr('footer.contact')}</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@holaski.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +56 2 2345 6789</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Santiago, Chile</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">{tr('footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{tr('footer.terms')}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/40">
          © {new Date().getFullYear()} HolaSki. {tr('footer.rights')}
        </div>
      </div>
    </footer>
  );
}