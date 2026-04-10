import { Link } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const { error } = await supabase.from('newsletter').insert([{ email }])
      if (error) throw error
      setStatus('success')
      setEmail('')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <footer className="bg-navy-950 pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-xl">❄️</div>
              <span className="text-2xl font-black tracking-tighter">HOLA<span className="text-blue-500">SKI</span></span>
            </Link>
            <p className="text-slate-400 text-lg max-w-md mb-8">
              Expertos en diseñar las mejores experiencias de esquí y snowboard en los destinos más exclusivos del mundo.
            </p>
            <form onSubmit={handleSubscribe} className="max-w-sm">
              <label className="block text-white font-bold mb-3 text-sm uppercase tracking-wider">Newsletter</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="flex-1 bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'OK'}
                </button>
              </div>
            </form>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Explora</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/destinos">Destinos</Link></li>
              <li><Link to="/paquetes">Paquetes</Link></li>
              <li><Link to="/planear">Planear Viaje</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Ayuda</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="#">Privacidad</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} HOLASKI. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}