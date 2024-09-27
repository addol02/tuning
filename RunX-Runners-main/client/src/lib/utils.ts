import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setJwtSession(key: string) {
  return localStorage.setItem('jwt_key', key);
}

export function getJwtSession() {
  return localStorage.getItem('jwt_key');
}