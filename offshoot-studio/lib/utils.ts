import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/** Base path for Recibook case study prototype (used by public/case-studies/recibook/recibook-prototype). */
export const BASE_PATH = "/case-studies/recibook/prototype"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
