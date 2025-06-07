// lib/api/categories.js
// Simple API service untuk fetch categories

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const categoriesAPI = {
  // Fetch semua categories
  async getAll() {
    try {
      const response = await fetch(`${baseUrl}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache", // Cache untuk performance
        next: { revalidate: 300 }, // Revalidate setiap 5 menit
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
};
