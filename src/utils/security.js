/**
 * Privacy & Security Utilities for KFSSEC Admin & User System
 * Personal Information Protection Act (개인정보 보호법) Compliance Masking
 */

/**
 * Mask Name: '김창업' -> '김*업', '안형상' -> '안*상', '이수' -> '이*'
 */
export function maskName(name) {
  if (!name || typeof name !== 'string') return '***';
  const str = name.trim();
  if (str.length <= 1) return '*';
  if (str.length === 2) return str[0] + '*';
  return str[0] + '*'.repeat(str.length - 2) + str[str.length - 1];
}

/**
 * Mask Phone Number: '010-3849-8120' -> '010-****-8120'
 */
export function maskPhone(phone) {
  if (!phone || typeof phone !== 'string') return '010-****-****';
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-****-${cleaned.slice(7)}`;
  } else if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-***-${cleaned.slice(6)}`;
  }
  return phone.replace(/(\d{3})\d{3,4}(\d{4})/, '$1-****-$2');
}

/**
 * Mask Email: 'changup.kim@gmail.com' -> 'ch******@gmail.com'
 */
export function maskEmail(email) {
  if (!email || typeof email !== 'string' || !email.includes('@')) return '***@***.com';
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) {
    return `${localPart[0]}*@${domain}`;
  }
  const visible = localPart.slice(0, 2);
  const masked = '*'.repeat(Math.max(2, localPart.length - 2));
  return `${visible}${masked}@${domain}`;
}

/**
 * Mask User / Application ID: 'APP-2026-089' -> 'APP-****-089'
 */
export function maskId(id) {
  if (!id || typeof id !== 'string') return '***';
  if (id.includes('-')) {
    const parts = id.split('-');
    if (parts.length >= 3) {
      return `${parts[0]}-****-${parts[parts.length - 1]}`;
    }
  }
  return id.slice(0, 3) + '****' + id.slice(-2);
}
