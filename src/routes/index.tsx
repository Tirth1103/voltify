import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Voltify — Electronics Store" },
      { name: "description", content: "Shop the latest mobiles, laptops, audio and accessories at Voltify." },
      { property: "og:title", content: "Voltify — Electronics Store" },
      { property: "og:description", content: "Shop the latest mobiles, laptops, audio and accessories at Voltify." },
    ],
  }),
  component: Index,
});

const PRODUCTS = [
  { id: 1, name: "iPhone 15 Pro", category: "Mobile", price: 1099, emoji: "📱", rating: 4.8 },
  { id: 2, name: "Samsung Galaxy S24 Ultra", category: "Mobile", price: 1199, emoji: "📱", rating: 4.7 },
  { id: 3, name: "Google Pixel 8", category: "Mobile", price: 699, emoji: "📱", rating: 4.6 },
  { id: 4, name: "OnePlus 12", category: "Mobile", price: 799, emoji: "📱", rating: 4.5 },
  { id: 5, name: "Xiaomi 14 Pro", category: "Mobile", price: 749, emoji: "📱", rating: 4.4 },
  { id: 6, name: 'MacBook Pro 16"', category: "Laptop", price: 2499, emoji: "💻", rating: 4.9 },
  { id: 7, name: "Dell XPS 15", category: "Laptop", price: 1799, emoji: "💻", rating: 4.7 },
  { id: 8, name: "HP Spectre x360", category: "Laptop", price: 1499, emoji: "💻", rating: 4.5 },
  { id: 9, name: "Lenovo ThinkPad X1", category: "Laptop", price: 1699, emoji: "💻", rating: 4.6 },
  { id: 10, name: "Asus ROG Zephyrus", category: "Laptop", price: 2199, emoji: "💻", rating: 4.7 },
  { id: 11, name: "Sony WH-1000XM5", category: "Audio", price: 399, emoji: "🎧", rating: 4.8 },
  { id: 12, name: "AirPods Pro 2", category: "Audio", price: 249, emoji: "🎧", rating: 4.7 },
  { id: 13, name: "Bose QC Ultra", category: "Audio", price: 429, emoji: "🎧", rating: 4.6 },
  { id: 14, name: "JBL Flip 6", category: "Audio", price: 129, emoji: "🔊", rating: 4.5 },
  { id: 15, name: "iPad Pro 12.9", category: "Tablet", price: 1099, emoji: "📲", rating: 4.8 },
  { id: 16, name: "Samsung Tab S9", category: "Tablet", price: 799, emoji: "📲", rating: 4.6 },
  { id: 17, name: "Apple Watch Ultra 2", category: "Wearable", price: 799, emoji: "⌚", rating: 4.7 },
  { id: 18, name: "Garmin Fenix 7", category: "Wearable", price: 699, emoji: "⌚", rating: 4.6 },
  { id: 19, name: "Canon EOS R6", category: "Camera", price: 2499, emoji: "📷", rating: 4.8 },
  { id: 20, name: "GoPro Hero 12", category: "Camera", price: 399, emoji: "📷", rating: 4.5 },
  { id: 21, name: "PlayStation 5", category: "Gaming", price: 499, emoji: "🎮", rating: 4.9 },
  { id: 22, name: "Nintendo Switch OLED", category: "Gaming", price: 349, emoji: "🎮", rating: 4.7 },
];

const CATEGORIES = ["All", "Mobile", "Laptop", "Audio", "Tablet", "Wearable", "Camera", "Gaming"];

function Index() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          p.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, query],
  );

  const addToCart = (id: number) =>
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id: number) =>
    setCart((c) => {
      const n = { ...c };
      if (!n[id]) return n;
      n[id] -= 1;
      if (n[id] <= 0) delete n[id];
      return n;
    });

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = PRODUCTS.find((p) => p.id === Number(id))!;
    return { ...product, qty: qty as number };
  });
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-lg">⚡</div>
            <span className="text-xl font-bold tracking-tight">Voltify</span>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search devices..."
            className="hidden flex-1 max-w-md rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-indigo-400 focus:bg-white md:block"
          />
          <button
            onClick={() => setCartOpen(true)}
            className="relative rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-fuchsia-500 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
            Power up your life with the latest tech.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-indigo-100">
            Hand-picked mobiles, laptops, audio gear and more — shipped fast, priced fair.
          </p>
          <a
            href="#shop"
            className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-semibold text-indigo-700 shadow-lg hover:bg-indigo-50"
          >
            Shop now →
          </a>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-fuchsia-400/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-indigo-400/30 blur-3xl" />
      </section>

      <main id="shop" className="mx-auto max-w-6xl px-4 py-10">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search devices..."
          className="mb-4 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:border-indigo-400 md:hidden"
        />
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                category === c
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-6xl transition group-hover:scale-110">
                {p.emoji}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                  {p.category}
                </span>
                <h3 className="mt-1 font-semibold">{p.name}</h3>
                <div className="mt-1 text-sm text-amber-500">
                  {"★".repeat(Math.round(p.rating))}
                  <span className="ml-1 text-slate-500">{p.rating}</span>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="text-lg font-bold">${p.price}</span>
                  <button
                    onClick={() => addToCart(p.id)}
                    className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-16 text-center text-slate-500">No products match your search.</p>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
          © 2026 Voltify. Built with ⚡ for tech lovers.
        </div>
      </footer>

      {cartOpen && (
        <div className="fixed inset-0 z-30 flex justify-end bg-slate-900/40" onClick={() => setCartOpen(false)}>
          <aside
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-slate-500 hover:text-slate-900">
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 && (
                <p className="py-16 text-center text-slate-500">Your cart is empty.</p>
              )}
              {cartItems.map((i) => (
                <div key={i.id} className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-2xl">
                    {i.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{i.name}</p>
                    <p className="text-xs text-slate-500">${i.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(i.id)}
                      className="h-7 w-7 rounded-full bg-slate-200 text-sm font-bold hover:bg-slate-300"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{i.qty}</span>
                    <button
                      onClick={() => addToCart(i.id)}
                      className="h-7 w-7 rounded-full bg-slate-200 text-sm font-bold hover:bg-slate-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 p-4">
              <div className="mb-3 flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button
                disabled={cartItems.length === 0}
                className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 py-3 font-semibold text-white disabled:opacity-50"
              >
                Checkout
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
