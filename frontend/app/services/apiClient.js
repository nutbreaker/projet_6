const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Generic HTTP client to request the API.
 * 
 * Handles automatic token injection and 401/403 erros.
 */
export async function apiClient(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    if (!API_BASE) throw new Error('Configuration API invalide');
    if (!token) throw new Error('Token utilisateur introuvable');

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...(options.headers || {})
    };

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
    });

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token');
            window.location.href = '/'; 
        }
        throw new Error(`Erreur API: ${response.statusText} (${response.status})`);
    }

    return response.json();
}