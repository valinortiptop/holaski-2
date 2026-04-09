// @ts-nocheck
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="max-w-xl bg-navy-950/80 backdrop-blur-2xl rounded-[3rem] p-12 text-center border border-blue-500/30 shadow-2xl">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4 uppercase">¡Mensaje Recibido!</h2>
          <p className="text-slate-400 mb-8">Te contactaremos en menos de 24 horas laborables.</p>
          <button onClick={() => window.location.href = '/'} className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold">Volver al Inicio</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-900 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter">Hablemos de tu <span className="text-blue-500">Próximo Viaje</span></h1>
            <p className="text-xl text-slate-400 mb-12 max-w-lg leading-relaxed">Estamos aquí para diseñar la experiencia de esquí perfecta para ti. Contacta con nuestros expertos.</p>
            
            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Email', value: 'info@snowluxury.com' },
                { icon: Phone, label: 'Teléfono', value: '+34 912 345 678' },
                { icon: MapPin, label: 'Oficina', value: 'Paseo de la Castellana, Madrid' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-navy-950/50 border border-white/10 rounded-2xl flex items-center justify-center text-blue-500">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-xl font-bold text-white">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-navy-950/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[3rem] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Nombre completo" required className="w-full bg-navy-900 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="email" placeholder="Correo electrónico" required className="w-full bg-navy-900 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <input type="text" placeholder="Asunto" className="w-full bg-navy-900 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea rows={6} placeholder="¿Cómo podemos ayudarte?" required className="w-full bg-navy-900 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all">
              <Send className="w-6 h-6" /> ENVIAR MENSAJE
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}