import { useEffect, useMemo, useState } from 'react';
import { Minus, Plus, Receipt, ShoppingCart, Trash2, Wallet } from 'lucide-react';
import { productsApi, transactionsApi } from './api';

const money = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
const fallbackPrices = { 1: 1250000000, 2: 1850000000, 3: 3200000000 };

function getPrice(product) {
  return Number(product.harga ?? fallbackPrices[product.id] ?? 100000);
}

export default function CashierDemo() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cashier-cart') || '[]'));
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('cashier-history') || '[]'));
  const [payment, setPayment] = useState('');
  const [customer, setCustomer] = useState('Umum');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    productsApi.list().then((data) => setProducts(Array.isArray(data) ? data : data.products || [])).catch(() => setProducts([])).finally(() => setLoading(false));
  }, []);
  useEffect(() => localStorage.setItem('cashier-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('cashier-history', JSON.stringify(history)), [history]);

  const cartItems = useMemo(() => cart.map((item) => ({ ...item, harga: getPrice(item), subtotal: getPrice(item) * item.qty })), [cart]);
  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const paid = Number(payment) || 0;
  const change = paid - total;

  const addToCart = (product) => setCart((old) => {
    const found = old.find((item) => item.id === product.id);
    return found ? old.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...old, { ...product, qty: 1 }];
  });
  const changeQty = (id, delta) => setCart((old) => old.map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  const clearCart = () => setCart([]);

  const checkout = async () => {
    if (!cartItems.length) return setError('Keranjang masih kosong.');
    if (paid < total) return setError('Uang bayar belum mencukupi.');
    const transaction = { id: Date.now(), pelanggan: customer || 'Umum', items: cartItems, total, bayar: paid, kembalian: change, tanggal: new Date().toISOString() };
    try {
      await transactionsApi.create(transaction);
      setMessage('Transaksi berhasil disimpan ke API PHP.');
    } catch {
      setMessage('Transaksi selesai dan disimpan di riwayat browser. API transaksi belum aktif online.');
    }
    setHistory((old) => [transaction, ...old]);
    setCart([]); setPayment(''); setCustomer('Umum'); setError('');
  };

  return <div className="cashier-page">
    <div className="cashier-heading"><div><span className="eyebrow">PROJECT WEB KASIR</span><h2>Kasir Penjualan</h2><p>Kelola produk, keranjang, pembayaran, dan riwayat transaksi.</p></div><div className="cashier-badge"><ShoppingCart size={16} /> {cartItems.reduce((sum, item) => sum + item.qty, 0)} item</div></div>
    {message && <div className="api-success">{message}</div>}{error && <div className="api-error">{error}</div>}
    <div className="cashier-layout">
      <section className="cashier-products"><div className="section-title"><h3>Daftar Produk</h3><span>{loading ? 'Memuat...' : `${products.length} produk`}</span></div><div className="cashier-product-grid">{products.map((product) => <article className="cashier-product" key={product.id}><img src={product.gambar} alt={product.nama} /><div className="cashier-product-info"><h4>{product.nama}</h4><strong>{money(getPrice(product))}</strong><button className="button button-primary" onClick={() => addToCart(product)}><Plus size={15} /> Tambah</button></div></article>)}</div></section>
      <aside className="cashier-panel"><div className="section-title"><h3><ShoppingCart size={18} /> Keranjang</h3><button className="text-button" onClick={clearCart}>Kosongkan</button></div>{cartItems.length ? <div className="cart-list">{cartItems.map((item) => <div className="cart-item" key={item.id}><div><strong>{item.nama}</strong><small>{money(item.harga)} × {item.qty}</small></div><div className="cart-controls"><button onClick={() => changeQty(item.id, -1)}><Minus size={13} /></button><b>{item.qty}</b><button onClick={() => changeQty(item.id, 1)}><Plus size={13} /></button><button className="delete-button" onClick={() => setCart((old) => old.filter((x) => x.id !== item.id))}><Trash2 size={14} /></button></div></div>)}</div> : <div className="empty-cart"><ShoppingCart size={28} /><p>Keranjang masih kosong.</p><small>Klik Tambah pada produk.</small></div>}
        <div className="cashier-total"><span>Total</span><strong>{money(total)}</strong></div><label className="cashier-label">Nama pelanggan<input value={customer} onChange={(e) => setCustomer(e.target.value)} /></label><label className="cashier-label">Uang bayar<input type="number" min="0" value={payment} onChange={(e) => setPayment(e.target.value)} placeholder="Masukkan nominal" /></label><div className="change-row"><span>Kembalian</span><strong className={change >= 0 ? 'positive' : 'negative'}>{money(Math.max(0, change))}</strong></div><button className="button button-primary checkout-button" onClick={checkout}><Receipt size={16} /> Checkout</button>
      </aside>
    </div>
    <section className="history-section"><div className="section-title"><h3><Wallet size={18} /> Riwayat transaksi</h3><span>{history.length} transaksi</span></div>{history.length ? <div className="history-list">{history.slice(0, 5).map((tx) => <div className="history-row" key={tx.id}><span>{new Date(tx.tanggal).toLocaleString('id-ID')}</span><strong>{tx.pelanggan}</strong><b>{money(tx.total)}</b></div>)}</div> : <p className="muted-text">Belum ada transaksi. Transaksi checkout akan muncul di sini.</p>}</section>
  </div>;
}
