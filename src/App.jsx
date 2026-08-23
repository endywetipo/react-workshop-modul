import { useMemo, useState } from 'react';
import { BookOpen, Check, ChevronRight, Code2, ExternalLink, Menu, Plus, RotateCcw, Save, Trash2, X } from 'lucide-react';
import { lessons, productsSeed, students } from './data/workshopData';
import CashierDemo from './CashierDemo';
import './App.css';

const Pill = ({ children, tone = 'blue' }) => <span className={`pill pill-${tone}`}>{children}</span>;

function ProductCard({ product, onDelete, onEdit }) {
  const [quantity, setQuantity] = useState(0);
  return (
    <article className="product-card">
      <div className="product-image-wrap"><img src={product.gambar} alt={product.nama} /><Pill>{`ID ${product.id}`}</Pill></div>
      <div className="product-body">
        <h3>{product.nama}</h3><p>{product.keterangan}</p>
        <a className="detail-link" href={product.link} target="_blank" rel="noreferrer">Detail produk <ExternalLink size={14} /></a>
        <div className="product-actions">
          {quantity > 0 ? <div className="quantity"><button onClick={() => setQuantity(Math.max(0, quantity - 1))}>−</button><strong>{quantity}</strong><button onClick={() => setQuantity(quantity + 1)}>+</button></div> : <button className="button button-primary" onClick={() => setQuantity(1)}>Tambah ke keranjang</button>}
          <div className="icon-actions"><button title="Edit" onClick={() => onEdit(product)}><Code2 size={17} /></button><button title="Hapus" onClick={() => onDelete(product.id)}><Trash2 size={17} /></button></div>
        </div>
      </div>
    </article>
  );
}

function FormDemo({ onSubmit }) {
  const initial = { nama: '', umur: '', hobi: 'Membaca' };
  const [dataForm, setDataForm] = useState(initial);
  const [submitted, setSubmitted] = useState(null);
  const change = (event) => setDataForm((old) => ({ ...old, [event.target.name]: event.target.value }));
  const submit = (event) => { event.preventDefault(); setSubmitted(dataForm); onSubmit?.(dataForm); };
  return <div className="demo-grid"><form className="demo-form" onSubmit={submit}>
    <label>Nama<input name="nama" value={dataForm.nama} onChange={change} placeholder="Masukkan nama" required /></label>
    <label>Umur<input name="umur" type="number" value={dataForm.umur} onChange={change} placeholder="Contoh: 20" required /></label>
    <label>Hobi<select name="hobi" value={dataForm.hobi} onChange={change}><option>Membaca</option><option>Renang</option><option>Musik</option><option>Olahraga</option></select></label>
    <button className="button button-primary" type="submit"><Save size={16} /> Simpan data</button>
  </form><div className="output-card"><span className="eyebrow">OUTPUT STATE</span>{submitted ? <><h3>Data berhasil diterima</h3><pre>{JSON.stringify(submitted, null, 2)}</pre></> : <p>Isi form lalu klik simpan untuk melihat hasil destructuring data.</p>}</div></div>;
}

function CounterDemo() {
  const [value, setValue] = useState(0);
  return <div className="counter-demo"><div className="counter-number">{value}</div><p>{value > 0 ? 'Produk siap dimasukkan ke keranjang.' : 'Belum ada produk dipilih.'}</p><div className="button-row"><button className="button button-secondary" onClick={() => setValue(Math.max(0, value - 1))}>Kurangi</button><button className="button button-primary" onClick={() => setValue(value + 1)}>Tambah</button><button className="button button-ghost" onClick={() => setValue(0)}><RotateCcw size={15} /> Reset</button></div></div>;
}

function ParentChildDemo() {
  const [message, setMessage] = useState('Belum ada data dari child.');
  return <div className="parent-child"><div className="parent-box"><Pill tone="purple">PARENT APP</Pill><h3>Data dari child</h3><p>{message}</p></div><div className="arrow"><ChevronRight /></div><button className="child-box" onClick={() => setMessage('Halo parent, data berhasil dikirim melalui method as props.') }><Pill tone="green">CHILD FORM</Pill><strong>Kirim data ke parent</strong></button></div>;
}

function CrudDemo() {
  const [items, setItems] = useState(productsSeed);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nama: '', keterangan: '', harga: '', gambar: '', link: '' });
  const [apiMode, setApiMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const [apiError, setApiError] = useState('');

  const loadFromApi = async () => {
    setLoading(true); setApiError(''); setApiMessage('Memuat data dari PHP...');
    try {
      const { productsApi } = await import('./api');
      const data = await productsApi.list();
      setItems(Array.isArray(data) ? data : data.products || []);
      setApiMessage('Data berhasil dimuat dari products.php dan akan tersimpan ke products.json.');
    } catch (error) {
      setApiError(`API belum tersambung: ${error.message}`);
      setApiMessage('Frontend tetap menampilkan data contoh agar materi dapat dipelajari.');
    } finally { setLoading(false); }
  };

  const toggleApi = () => { const next = !apiMode; setApiMode(next); if (next) loadFromApi(); else { setApiError(''); setApiMessage('Mode State Lokal aktif. Perubahan hanya sementara.'); setItems(productsSeed); } };
  const openAdd = () => { setEditing('new'); setForm({ nama: '', keterangan: '', harga: '', gambar: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80', link: '#' }); };
  const openEdit = (item) => { setEditing(item.id); setForm({ nama: item.nama, keterangan: item.keterangan, harga: item.harga ?? '', gambar: item.gambar, link: item.link }); };
  const save = async (event) => {
    event.preventDefault(); setLoading(true); setApiError('');
    try {
      if (apiMode) {
        const { productsApi } = await import('./api');
        const saved = editing === 'new' ? await productsApi.create(form) : await productsApi.update(editing, form);
        setItems((old) => editing === 'new' ? [...old, saved] : old.map((x) => x.id === editing ? saved : x));
        setApiMessage('Berhasil disimpan permanen melalui API PHP.');
      } else {
        setItems((old) => editing === 'new' ? [...old, { ...form, id: Date.now() }] : old.map((x) => x.id === editing ? { ...x, ...form } : x));
        setApiMessage('Tersimpan di state lokal selama halaman ini terbuka.');
      }
      setEditing(null);
    } catch (error) { setApiError(`Gagal menyimpan: ${error.message}`); } finally { setLoading(false); }
  };
  const remove = async (id) => {
    setLoading(true); setApiError('');
    try {
      if (apiMode) { const { productsApi } = await import('./api'); await productsApi.remove(id); setApiMessage('Produk berhasil dihapus permanen dari products.json.'); }
      setItems((old) => old.filter((x) => x.id !== id));
    } catch (error) { setApiError(`Gagal menghapus: ${error.message}`); } finally { setLoading(false); }
  };
  return <div className="crud-wrap"><div className="crud-toolbar"><div><span className="eyebrow">PROJECT CRUD</span><h2>Daftar produk</h2></div><div className="toolbar-actions"><button className={`toggle ${apiMode ? 'active' : ''}`} onClick={toggleApi}><span /> {apiMode ? 'Mode API PHP' : 'Mode State Lokal'}</button><button className="button button-primary" onClick={openAdd}><Plus size={16} /> Tambah produk</button></div></div>{apiMode && <div className="api-note"><strong>Mode API PHP aktif.</strong> Klik mode ini setelah menjalankan `php -S localhost:8000 -t backend-php`. Data CRUD akan dibaca dan disimpan di <code>backend-php/products.json</code>.</div>}{apiMessage && <div className="api-success">{apiMessage}</div>}{apiError && <div className="api-error">{apiError}</div>}{loading && <div className="api-loading">Memproses...</div>}{editing && <form className="edit-form" onSubmit={save}><div className="form-heading"><h3>{editing === 'new' ? 'Tambah produk' : 'Edit produk'}</h3><button type="button" onClick={() => setEditing(null)}><X /></button></div><div className="form-row"><input placeholder="Nama produk" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} required /><input placeholder="Harga (Rp)" type="number" min="0" value={form.harga} onChange={(e) => setForm({ ...form, harga: e.target.value })} required /></div><div className="form-row"><input placeholder="Link gambar" value={form.gambar} onChange={(e) => setForm({ ...form, gambar: e.target.value })} required /><input placeholder="Link detail" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} required /></div><textarea placeholder="Keterangan produk" value={form.keterangan} onChange={(e) => setForm({ ...form, keterangan: e.target.value })} required /><button className="button button-primary" type="submit" disabled={loading}><Check size={16} /> Simpan</button></form>}<div className="product-grid">{items.map((item) => <ProductCard key={item.id} product={item} onDelete={remove} onEdit={openEdit} />)}</div></div>;
}

function LessonContent({ id }) {
  const selected = lessons.find((lesson) => lesson.id === id);
  if (id === 'kasir') return <section className="lesson-panel"><CashierDemo /></section>;
  if (id === 'coba01') return <section className="lesson-panel"><LessonHeader lesson={selected} /><div className="hello-demo"><span className="hello-mark">&lt;/&gt;</span><div><span className="eyebrow">VARIABLE + JSX</span><h2>Hello, Adinda!</h2><p>Welcome to your first ReactJS code.</p></div></div><CodeSnippet code={`const nama = 'Adinda';\nreturn <h2>Welcome {nama}</h2>;`} /></section>;
  if (id === 'coba02' || id === 'coba02c') return <section className="lesson-panel"><LessonHeader lesson={selected} /><div className="student-grid">{students.map((student) => <div className="student-card" key={student.id}><div className="avatar">{student.nama[0]}</div><div><h3>{student.nama}</h3><p>Nilai praktikum</p></div><strong>{student.nilai}</strong></div>)}</div><CodeSnippet code={`const Tampilan = ({ nama, nilai }) => (\n  <article className="card">\n    <h2>{nama}</h2><p>{nilai}</p>\n  </article>\n);`} /></section>;
  if (id === 'coba03' || id === 'coba03b' || id === 'coba04') return <section className="lesson-panel"><LessonHeader lesson={selected} /><CounterDemo /><CodeSnippet code={`const [jumlah, setJumlah] = useState(0);\n<button onClick={() => setJumlah(jumlah + 1)}>Tambah</button>\n{jumlah > 0 ? <Keranjang /> : <EmptyState />}`} /></section>;
  if (id === 'coba03c') return <section className="lesson-panel"><LessonHeader lesson={selected} /><div className="conditional-demo"><div className="status-light" /><h2>Conditional rendering aktif</h2><p>Komponen ditampilkan berdasarkan nilai state atau props.</p></div><CodeSnippet code={`{isLogin ? <Dashboard /> : <Login />}`} /></section>;
  if (id === 'coba05') return <section className="lesson-panel"><LessonHeader lesson={selected} /><FormDemo /></section>;
  if (id === 'coba06') return <section className="lesson-panel"><LessonHeader lesson={selected} /><ParentChildDemo /><CodeSnippet code={`<Form kirimData={terimaData} />\nconst Form = ({ kirimData }) => {\n  kirimData(dataForm);\n};`} /></section>;
  return <section className="lesson-panel"><LessonHeader lesson={selected} /><CrudDemo /></section>;
}

const LessonHeader = ({ lesson }) => <div className="lesson-header"><div><Pill tone="purple">{lesson.id.toUpperCase()}</Pill><h1>{lesson.title}</h1><p>{lesson.description}</p></div><div className="lesson-check"><Check size={18} /> Praktik aktif</div></div>;
const CodeSnippet = ({ code }) => <div className="code-box"><div className="code-top"><span /><span /><span /><small>App.jsx</small></div><pre><code>{code}</code></pre></div>;

export default function App() {
  const [active, setActive] = useState('coba01');
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = useMemo(() => lessons.find((x) => x.id === active), [active]);
  return <div className="app-shell"><aside className={mobileOpen ? 'sidebar open' : 'sidebar'}><div className="brand"><div className="brand-icon"><Code2 size={20} /></div><div><strong>React Workshop</strong><small>Pemrograman Web</small></div></div><div className="side-label">MODUL LATIHAN</div><nav>{lessons.map((lesson) => <button key={lesson.id} className={active === lesson.id ? 'nav-item active' : 'nav-item'} onClick={() => { setActive(lesson.id); setMobileOpen(false); }}><span className="nav-id">{lesson.id.replace('coba', '')}</span><span>{lesson.title}</span>{active === lesson.id && <ChevronRight size={16} />}</button>)}</nav><div className="sidebar-bottom"><div className="progress-label"><span>Progress modul</span><strong>{`${lessons.findIndex((x) => x.id === active) + 1}/${lessons.length}`}</strong></div><div className="progress"><span style={{ width: `${((lessons.findIndex((x) => x.id === active) + 1) / lessons.length) * 100}%` }} /></div><p>Pelajari konsep React secara bertahap melalui praktik langsung.</p></div></aside><main className="main-content"><header className="topbar"><button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}><Menu /></button><div><span className="eyebrow">WORKSHOP PEMROGRAMAN WEB</span><h2>{current?.title}</h2></div><a className="github-link" href="https://github.com/endywetipo/react-workshop-modul" target="_blank" rel="noreferrer"><BookOpen size={17} /> Source code</a></header><div className="content-wrap"><div className="breadcrumb"><BookOpen size={15} /> Modul React JS <ChevronRight size={14} /> <span>{active.toUpperCase()}</span></div><LessonContent id={active} /></div></main></div>;
}
