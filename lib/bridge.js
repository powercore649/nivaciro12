const BRIDGE_URL = process.env.BRIDGE_URL;
const BRIDGE_SECRET = process.env.BRIDGE_SECRET;

async function authedFetch(path, options = {}) {
  const res = await fetch(`${BRIDGE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BRIDGE_SECRET}`,
      ...(options.headers || {}),
    },
    cache: 'no-store',
  });
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const err = new Error((data && data.error) || `bridge_error_${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const bridge = {
  // Route publique, pas besoin de secret : la liste affichée sur le site
  publicServers: async () => {
    const res = await fetch(`${BRIDGE_URL}/public/servers`, { cache: 'no-store' });
    return res.json();
  },
  // Routes authentifiées (secret), utilisées uniquement pour la soumission de compte
  guildInfo: (guildId) => authedFetch(`/api/guilds/${guildId}`),
  getServerConfig: (guildId) => authedFetch(`/api/config/server/${guildId}`),
  putServerConfig: (guildId, body) => authedFetch(`/api/config/server/${guildId}`, { method: 'PUT', body: JSON.stringify(body) }),
};
