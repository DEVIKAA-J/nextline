/* ============================================
   NEXTLINE — Supabase Configuration
   ============================================ */

const SUPABASE_URL = "https://lrytzorvujbmlymtwstu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyeXR6b3J2dWpibWx5bXR3c3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNzg1NzEsImV4cCI6MjA4OTc1NDU3MX0.xLZDsXOU4LrGklAES71lMCm-y8eNyQSTplSlotHa6qM";

// Lightweight Supabase client (no npm needed)
const sb = {
  headers: {
    "Content-Type": "application/json",
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
  },

  async from(table) {
    return new SupabaseQuery(table, this.headers);
  }
};

class SupabaseQuery {
  constructor(table, headers) {
    this.table = table;
    this.headers = headers;
    this.url = `${SUPABASE_URL}/rest/v1/${table}`;
    this._params = [];
    this._order = null;
    this._limit = null;
    this._single = false;
  }

  select(cols = "*") { this._cols = cols; return this; }
  eq(col, val)        { this._params.push(`${col}=eq.${val}`); return this; }
  neq(col, val)       { this._params.push(`${col}=neq.${val}`); return this; }
  order(col, { ascending = true } = {}) { this._order = `${col}.${ascending ? 'asc' : 'desc'}`; return this; }
  limit(n)            { this._limit = n; return this; }
  single()            { this._single = true; return this; }

  _buildUrl(extra = "") {
    const params = [...this._params];
    if (this._cols)  params.unshift(`select=${this._cols}`);
    if (this._order) params.push(`order=${this._order}`);
    if (this._limit) params.push(`limit=${this._limit}`);
    return this.url + extra + (params.length ? "?" + params.join("&") : "");
  }

  async get() {
    const headers = { ...this.headers };
    if (this._single) headers["Accept"] = "application/vnd.pgrst.object+json";
    const res = await fetch(this._buildUrl(), { headers });
    const data = await res.json();
    return { data, error: res.ok ? null : data };
  }

  async insert(body) {
    const res = await fetch(this._buildUrl(), {
      method: "POST",
      headers: { ...this.headers, "Prefer": "return=representation" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return { data, error: res.ok ? null : data };
  }

  async update(body) {
    const res = await fetch(this._buildUrl(), {
      method: "PATCH",
      headers: { ...this.headers, "Prefer": "return=representation" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return { data, error: res.ok ? null : data };
  }

  async delete() {
    const res = await fetch(this._buildUrl(), {
      method: "DELETE",
      headers: { ...this.headers, "Prefer": "return=representation" }
    });
    const data = res.status === 204 ? [] : await res.json();
    return { data, error: res.ok ? null : data };
  }
}