/**
 * LocalStorage utility to replace Spark's KV storage
 * Provides type-safe key-value storage with localStorage
 */

export class Storage {
  /**
   * Get a value from localStorage
   */
  static async get<T>(key: string): Promise<T | null> {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  }

  /**
   * Set a value in localStorage
   */
  static async set<T>(key: string, value: T): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
      throw error;
    }
  }

  /**
   * Get all keys from localStorage
   */
  static async keys(): Promise<string[]> {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('Error getting keys:', error);
      return [];
    }
  }

  /**
   * Delete a value from localStorage
   */
  static async delete(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error deleting item ${key}:`, error);
      throw error;
    }
  }

  /**
   * Clear all items from localStorage
   */
  static async clear(): Promise<void> {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  /**
   * Check if a key exists
   */
  static async has(key: string): Promise<boolean> {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking key ${key}:`, error);
      return false;
    }
  }
}

export default Storage;
