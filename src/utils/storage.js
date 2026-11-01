import { STORAGE_KEYS } from '../data/constants';

/**
 * Safe retrieval of enquiries from localStorage
 * Handles missing, empty, and malformed JSON data gracefully.
 */
export function getStoredEnquiries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error("Titan Haulage - Failed to parse enquiries from localStorage:", err);
    return [];
  }
}

/**
 * Saves the entire list of enquiries back to localStorage
 */
export function saveStoredEnquiries(enquiries) {
  try {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    // Trigger custom event so any active listeners can sync immediately if needed
    window.dispatchEvent(new Event("enquiries_updated"));
    return true;
  } catch (err) {
    console.error("Titan Haulage - Failed to write enquiries to localStorage:", err);
    return false;
  }
}

/**
 * Inserts a new enquiry
 */
export function addEnquiry(newEnquiry) {
  const existing = getStoredEnquiries();
  const item = {
    id: 'ENQ-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000),
    fullName: newEnquiry.fullName.trim(),
    phone: newEnquiry.phone.trim(),
    email: (newEnquiry.email || '').trim(),
    serviceRequired: newEnquiry.serviceRequired || 'Construction Material Transportation',
    projectLocation: (newEnquiry.projectLocation || '').trim(),
    message: newEnquiry.message.trim(),
    status: 'New',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const updated = [item, ...existing];
  saveStoredEnquiries(updated);
  return item;
}

/**
 * Updates status or details of an existing enquiry
 */
export function updateEnquiryStatus(id, newStatus) {
  const existing = getStoredEnquiries();
  const updated = existing.map(item => {
    if (item.id === id) {
      return {
        ...item,
        status: newStatus,
        updatedAt: new Date().toISOString()
      };
    }
    return item;
  });
  saveStoredEnquiries(updated);
  return updated;
}

/**
 * Deletes an enquiry by ID
 */
export function deleteEnquiry(id) {
  const existing = getStoredEnquiries();
  const updated = existing.filter(item => item.id !== id);
  saveStoredEnquiries(updated);
  return updated;
}

/**
 * Session storage authentication helpers
 */
export function getAdminSession() {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === "authenticated";
  } catch (err) {
    return false;
  }
}

export function setAdminSession(isAuthenticated) {
  try {
    if (isAuthenticated) {
      sessionStorage.setItem(STORAGE_KEYS.AUTH, "authenticated");
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  } catch (err) {
    console.error("Titan Haulage - Session storage access error:", err);
  }
}
