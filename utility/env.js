/**
 * @file utility/env.js
 * @description Abstraksi dan validasi untuk variabel lingkungan
 */

/**
 * Konfigurasi lingkungan aplikasi
 */
const env = {
  /**
   * Konfigurasi API
   */
  api: {
    /** URL dasar API */
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
    /** Timeout request dalam milidetik */
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000", 10),
  },

  /**
   * Konfigurasi lokasi
   */
  location: {
    /** Kode desa untuk filter default */
    villageCode: process.env.NEXT_PUBLIC_VILLAGE_CODE || "5108050003",
    /** Kode kabupaten untuk filter default */
    districtCode: process.env.NEXT_PUBLIC_DISTRICT_CODE || "510805",
  },

  /**
   * Toggle fitur aplikasi
   */
  features: {
    /** Apakah menggunakan fitur pencarian baru */
    enableNewSearch: process.env.NEXT_PUBLIC_ENABLE_NEW_SEARCH === "true",
  },

  /**
   * Konfigurasi CDN
   */
  cdn: {
    /** URL dasar CDN */
    url: process.env.NEXT_PUBLIC_CDN_URL || "",
  },

  /**
   * Validasi keberadaan variabel lingkungan penting
   * @returns {void}
   */
  validate() {
    // Hanya jalankan validasi di development
    if (process.env.NODE_ENV !== "production") {
      const requiredVars = [
        { key: "NEXT_PUBLIC_API_URL", name: "API URL" },
        { key: "NEXT_PUBLIC_VILLAGE_CODE", name: "Village Code" },
      ];

      const missing = requiredVars.filter((v) => !process.env[v.key]);

      if (missing.length > 0) {
        console.warn(
          `⚠️ Missing environment variables: ${missing
            .map((v) => v.name)
            .join(", ")}\n` +
            `Please check your .env file or environment configuration.`
        );
      }
    }
  },
};

// Jalankan validasi saat module diimpor
env.validate();

export default env;
