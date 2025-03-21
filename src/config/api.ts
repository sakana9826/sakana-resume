export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const API_ENDPOINTS = {
  VERIFY_ACCESS_CODE: `${API_BASE_URL}/api/verify-access-code`,
  GENERATE_ACCESS_CODE: `${API_BASE_URL}/api/generate-access-code`
} 