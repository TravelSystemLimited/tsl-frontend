// In your utils/dateUtils.ts (or create this file)
export const formatDateForInput = (date: Date | null): string => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseDateInput = (value: string): Date | null => {
  if (!value) return null;
  const parts = value.split('-');
  if (parts.length !== 3) return null;
  // Note: Month is 0-based in JavaScript Date
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
};

export const safeParseDate = (dateStr: string | Date | null): Date | null => {
  if (!dateStr) return null;
  if (dateStr instanceof Date) return dateStr;
  
  // Try ISO format first
  const isoDate = new Date(dateStr);
  if (!isNaN(isoDate.getTime())) return isoDate;
  
  // Try locale format (for mobile Safari)
  const localeDate = new Date(dateStr.replace(/-/g, '/'));
  return isNaN(localeDate.getTime()) ? null : localeDate;
};

export const normalizeDate = (date: Date | null): Date | null => {
  if (!date) return null;
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};