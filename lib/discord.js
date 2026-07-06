const ADMINISTRATOR = 0x8;

export async function getUserGuilds(accessToken) {
  const res = await fetch('https://discord.com/api/v10/users/@me/guilds', {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = new Error('discord_api_unavailable');
    err.status = res.status === 401 ? 401 : 503;
    throw err;
  }
  return res.json();
}

export function hasAdmin(permissions) {
  try {
    return (BigInt(permissions) & BigInt(ADMINISTRATOR)) === BigInt(ADMINISTRATOR);
  } catch {
    return false;
  }
}
