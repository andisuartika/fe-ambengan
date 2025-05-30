import env from "./env";

/**
 * Class untuk mengelola API requests
 */
class ApiService {
  /**
   * Membuat instance ApiService
   * @param {Object} config - Konfigurasi API
   */
  constructor(config = {}) {
    this.baseUrl = config.baseUrl || env.api.baseUrl;
    this.timeout = config.timeout || env.api.timeout;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  /**
   * Membuat options untuk fetch request
   * @param {Object} options - Opsi tambahan
   * @returns {Object} Opsi lengkap untuk fetch
   */
  createFetchOptions(options = {}) {
    return {
      headers: {
        ...this.defaultHeaders,
        ...(options.headers || {}),
      },
      signal: AbortSignal.timeout(options.timeout || this.timeout),
      ...options,
    };
  }

  /**
   * Melakukan fetch request dengan error handling
   * @param {string} url - URL endpoint
   * @param {Object} options - Opsi fetch
   * @returns {Promise<any>} Hasil request
   */
  async fetchWithErrorHandling(url, options = {}) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error(`Request timeout after ${this.timeout}ms`);
      }
      throw error;
    }
  }

  /**
   * Mengambil data destinasi
   * @param {Object} params - Parameter query
   * @returns {Promise<Array>} Daftar destinasi
   */
  async getDestinations(params = {}) {
    const villageCode = params.villageCode || env.location.villageCode;

    const queryParams = new URLSearchParams({
      village: villageCode,
      ...(params.extraParams || {}),
    }).toString();

    const result = await this.fetchWithErrorHandling(
      `${this.baseUrl}/destinations?${queryParams}`,
      this.createFetchOptions()
    );

    if (result.status !== "success" || !Array.isArray(result.data)) {
      throw new Error("Format data tidak sesuai");
    }

    return result.data;
  }

  /**
   * Melakukan pencarian dengan filter
   * @param {Object} filters - Filter pencarian
   * @returns {Promise<Object>} Hasil pencarian
   */
  async searchWithFilters(filters = {}) {
    const queryParams = new URLSearchParams({
      destination: filters.destination || "",
      activity: filters.activity || "",
      date: filters.date || "",
      guests: filters.guests || "0",
      ...(filters.extraParams || {}),
    }).toString();

    const result = await this.fetchWithErrorHandling(
      `${this.baseUrl}/search?${queryParams}`,
      this.createFetchOptions()
    );

    return result;
  }
}

// Export instance default
const apiService = new ApiService();
export default apiService;

// Export class untuk kasus penggunaan khusus
export { ApiService };
