import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export interface JwtPayload {
  id: string | number;
  role: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

/**
 * Decode a JWT token into its payload.
 * @param token - JWT token string
 * @returns Decoded payload or null if invalid
 */
export function decodeToken(token: string): JwtPayload | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

/**
 * Extract the user role from a JWT token.
 * @param token - JWT token string
 * @returns User role or null
 */
export function getRoleFromToken(token: string): string | null {
  const payload = decodeToken(token);
  return payload?.role ?? null;
}

/**
 * Extract the user ID from a JWT token.
 * @param token - JWT token string
 * @returns User ID or null
 */
export function getUserIdFromToken(token: string): string | number | null {
  const payload = decodeToken(token);
  return payload?.id ?? null;
}

/**
 * Check if a token is expired based on its `exp` claim.
 * @param token - JWT token string
 * @returns true if expired or invalid, false otherwise
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload || typeof payload.exp !== 'number') return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

/**
 * Retrieve the JWT token stored in cookies under the key "xyz_token".
 * @returns JWT token string or null
 */
export function getTokenFromCookies(): string | null {
  try {
    return Cookies.get('xyz_token') || null;
  } catch (error) {
    console.error('Failed to get token from cookies:', error);
    return null;
  }
}

/**
 * Extract role and expiration info from the token.
 * @param token - JWT token string
 * @returns Object with role and exp, or nulls if invalid
 */
export function getTokenInfo(token: string): { id: number | null; role: string | null; exp: number | null } {
  const payload = decodeToken(token);
  return {
    id: payload?.id ? Number(payload.id) : null,
    role: payload?.role ?? null,
    exp: payload?.exp ?? null,
  };
}
