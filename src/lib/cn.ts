type ClassValue = string | false | null | undefined

/** Joins class names, dropping falsy values. Small enough that a dependency isn't worth it. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
