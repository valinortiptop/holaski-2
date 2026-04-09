// @ts-nocheck
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8">HABLEMOS DE <span className="text-blue-500">NIEVE</span></h1>
          <p className="text-slate-400 text-xl mb-12">¿Tienes dudas? Nuestro equipo de expertos está listo para ayudarte a planear el viaje perfecto.</p>
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500"><Mail /></div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase">Email</p>
                <p className="text-xl font-bold">hola@holaski.com</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500"><Phone /></div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase">Teléfono</p>
                <p className="text-xl font-bold">+34 900 123 456</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-navy-950 p-10 rounded-[2.5rem] border border-white/5">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="Nombre" className="w-full bg-navy-900 border border-white/10 rounded-xl px-6 py-4 text-white outline-none" />
              <input type="email" placeholder="Email" className="w-full bg-navy-900 border border-white/10 rounded-xl px-6 py-4 text-white outline-none" />
            </div>
            <textarea rows={5} placeholder="Tu mensaje..." className="w-full bg-navy-900 border border-white/10 rounded-xl px-6 py-4 text-white outline-none"></textarea>
            <button className="w-full bg-blue-600 py-5 rounded-xl font-black text-lg shadow-xl shadow-blue-600/20">ENVIAR MENSAJE</button>
          </form>
        </div>
      </div>
    </div>
  )
}