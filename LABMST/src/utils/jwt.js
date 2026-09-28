
export function generateToken(user) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload = {
    userId: user.userId,
    username: user.username,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600
  };


  const encodeBase64 = (obj) => {
    return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
  };

  const encodedHeader = encodeBase64(header);
  const encodedPayload = encodeBase64(payload);

  const signature = btoa('simulated_secure_signature_hash');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function decodeToken(token) {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const decodedPayloadStr = decodeURIComponent(escape(atob(parts[1])));
    const payload = JSON.parse(decodedPayloadStr);

    return payload;
  } catch (err) {
    console.error('Failed to decode token:', err);
    return null;
  }

}