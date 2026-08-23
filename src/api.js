const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/products.php';

async function request(path = '', options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Request gagal dengan status ${response.status}`);
  }
  return data;
}

export const productsApi = {
  list: () => request(),
  create: (product) => request('', { method: 'POST', body: JSON.stringify(product) }),
  update: (id, product) => request(`?id=${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(product) }),
  remove: (id) => request(`?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
};

const TRANSACTIONS_URL = API_URL.replace(/products\.php$/, 'transactions.php');
export const transactionsApi = {
  list: () => requestTo(TRANSACTIONS_URL),
  create: (transaction) => requestTo(TRANSACTIONS_URL, { method: 'POST', body: JSON.stringify(transaction) })
};

async function requestTo(url, options = {}) {
  const response = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Request gagal dengan status ${response.status}`);
  return data;
}

export { API_URL };
