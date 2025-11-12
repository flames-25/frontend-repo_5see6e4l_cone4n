import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Spline from '@splinetool/react-spline'

const BRAND = {
  name: 'Indium Science Academy',
  colors: {
    primary: '#1E90FF',
    accent: '#FFA500',
  }
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-blue-500 grid place-items-center text-white font-bold">IA</div>
            <div>
              <h1 className="text-base font-semibold">{BRAND.name}</h1>
              <p className="text-xs text-gray-500">Where Learning Shines Brighter</p>
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/admission" className="hover:text-blue-600">Admission</Link>
            <Link to="/courses" className="hover:text-blue-600">Courses</Link>
            <Link to="/materials" className="hover:text-blue-600">Study Materials</Link>
            <Link to="/announcements" className="hover:text-blue-600">Announcements</Link>
            <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-10 border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function Home() {
  return (
    <div className="relative">
      <section className="relative h-[420px] overflow-hidden">
        <Spline scene="https://prod.spline.design/95Gu7tsx2K-0F3oi/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-6xl px-4 pb-10 w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Welcome to Indium Science Academy – Where Learning Shines Brighter 🌟</h2>
            <p className="mt-3 text-gray-700 max-w-2xl">An admission and learning platform for SSC & CBSE students from 1st to 10th standard.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/admission" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Admission</Link>
              <Link to="/courses" className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600">Courses</Link>
              <Link to="/announcements" className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50">Announcements</Link>
              <Link to="/contact" className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50">Contact</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Admissions', text: 'Apply online for the new academic year.' },
          { title: 'Courses', text: '1st–10th standards for SSC & CBSE.' },
          { title: 'Study Materials', text: 'Access PDFs, videos, and notes.' },
          { title: 'Announcements', text: 'Stay updated with schedules and events.' },
        ].map((c) => (
          <div key={c.title} className="rounded-xl border p-5 hover:shadow-sm transition">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{c.text}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" {...props} />
    </label>
  )
}

function Admission() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    student_name: '', standard: '', board: 'SSC', dob: '', parent_name: '', mobile: '', address: '', previous_school: '', photo_url: ''
  })
  const backend = import.meta.env.VITE_BACKEND_URL || ''

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/admissions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed')
      setSent(true)
    } catch (e) {
      alert('Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-center">
        <h2 className="text-2xl font-semibold">Thank you for your application</h2>
        <p className="text-gray-600 mt-2">We have received your details. Our team will contact you shortly.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h2 className="text-2xl font-semibold">Admission Form</h2>
      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <Input label="Student Name" value={form.student_name} onChange={(e)=>setForm({...form, student_name:e.target.value})} required />
        <Input label="Standard / Class" value={form.standard} onChange={(e)=>setForm({...form, standard:e.target.value})} required />
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Board</span>
          <select className="mt-1 w-full rounded border px-3 py-2" value={form.board} onChange={(e)=>setForm({...form, board:e.target.value})}>
            <option>SSC</option>
            <option>CBSE</option>
          </select>
        </label>
        <Input label="Date of Birth" type="date" value={form.dob} onChange={(e)=>setForm({...form, dob:e.target.value})} required />
        <Input label="Parent’s Name" value={form.parent_name} onChange={(e)=>setForm({...form, parent_name:e.target.value})} required />
        <Input label="Mobile Number" value={form.mobile} onChange={(e)=>setForm({...form, mobile:e.target.value})} required />
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Address</span>
          <textarea className="mt-1 w-full rounded border px-3 py-2" value={form.address} onChange={(e)=>setForm({...form, address:e.target.value})} rows={3} />
        </label>
        <Input label="Previous School" value={form.previous_school} onChange={(e)=>setForm({...form, previous_school:e.target.value})} />
        <Input label="Photo URL" type="url" value={form.photo_url} onChange={(e)=>setForm({...form, photo_url:e.target.value})} />
        <button disabled={loading} className="mt-2 inline-flex items-center justify-center rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-60">
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  )
}

function Courses() {
  const [items, setItems] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL || ''
  useEffect(()=>{
    fetch(`${backend}/api/courses`).then(r=>r.json()).then(setItems).catch(()=>{})
  },[])
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-semibold">Courses</h2>
      <p className="text-gray-600 mt-2">Classes 1st–10th for SSC & CBSE</p>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((c)=> (
          <div key={c._id} className="rounded-xl border p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Class {c.class_level} • {c.board}</h3>
              <span className="text-xs rounded-full px-2 py-0.5 bg-orange-100 text-orange-700">{(c.subjects||[]).length} subjects</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Teacher: {c.teacher_name}</p>
            <p className="text-sm text-gray-600">Schedule: {c.schedule}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(c.subjects||[]).map(s=> <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Materials() {
  const [items, setItems] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL || ''
  useEffect(()=>{
    fetch(`${backend}/api/materials`).then(r=>r.json()).then(setItems).catch(()=>{})
  },[])
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-semibold">Study Materials</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((m)=> (
          <a key={m._id} href={m.url} target="_blank" rel="noreferrer" className="rounded-xl border p-5 hover:shadow-sm transition block">
            <h3 className="font-semibold">{m.title}</h3>
            <p className="text-sm text-gray-600 mt-1">Class {m.class_level} • {m.subject} • {m.kind?.toUpperCase?.()}</p>
            {m.description ? <p className="text-sm text-gray-600 mt-2">{m.description}</p> : null}
          </a>
        ))}
      </div>
    </div>
  )
}

function Announcements() {
  const [items, setItems] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL || ''
  useEffect(()=>{
    fetch(`${backend}/api/announcements`).then(r=>r.json()).then(setItems).catch(()=>{})
  },[])
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="text-2xl font-semibold">Announcements</h2>
      <div className="mt-6 space-y-4">
        {items.map((a)=> (
          <div key={a._id} className="rounded-xl border p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{a.title}</h3>
              {a.pinned ? <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Pinned</span> : null}
            </div>
            <p className="text-sm text-gray-700 mt-2">{a.message}</p>
            {a.date ? <p className="text-xs text-gray-500 mt-1">{a.date}</p> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="text-2xl font-semibold">Contact Us</h2>
      <div className="mt-4 space-y-2 text-gray-700">
        <p>Indium Science Academy, Kapaleshwar Nagar, Nashik</p>
        <p>Phone: <a href="tel:+910000000000" className="text-blue-600 hover:underline">Insert contact number</a></p>
        <div className="flex gap-3 mt-3">
          <a href="https://wa.me/910000000000" className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600">WhatsApp</a>
          <a href="https://maps.google.com/?q=Indium%20Science%20Academy%20Kapaleshwar%20Nagar%20Nashik" target="_blank" className="px-4 py-2 rounded border">Open Map</a>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
