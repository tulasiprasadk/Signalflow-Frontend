const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://signalflow-backend.vercel.app';
const MOCK_API = process.env.NEXT_PUBLIC_MOCK_API === 'true';

/**
 * Initiate Twitter OAuth login flow
 * Redirects to backend OAuth endpoint
 */
export const initiateTwitterOAuth = () => {
  if (MOCK_API) {
    window.location.href = `/mock/social/connect/twitter`;
    return;
  }
  window.location.href = `${API_BASE_URL}/api/social/connect/twitter`;
};

/**
 * Initiate Facebook OAuth login flow
 */
export const initiateFacebookOAuth = () => {
  if (MOCK_API) {
    window.location.href = `/mock/social/connect/facebook`;
    return;
  }
  window.location.href = `${API_BASE_URL}/api/social/connect/facebook`;
};

/**
 * Initiate LinkedIn OAuth login flow
 */
export const initiateLinkedInOAuth = () => {
  if (MOCK_API) {
    window.location.href = `/mock/social/connect/linkedin`;
    return;
  }
  window.location.href = `${API_BASE_URL}/api/social/connect/linkedin`;
};

/**
 * Initiate Instagram OAuth login flow (via Facebook)
 */
export const initiateInstagramOAuth = () => {
  if (MOCK_API) {
    window.location.href = `/mock/social/connect/instagram`;
    return;
  }
  window.location.href = `${API_BASE_URL}/api/social/connect/instagram`;
};

/**
 * Generic OAuth initiator
 */
export const initiateOAuth = (provider) => {
  const provider_lower = provider.toLowerCase();
  if (MOCK_API) {
    window.location.href = `/mock/social/connect/${provider_lower}`;
    return;
  }
  window.location.href = `${API_BASE_URL}/api/social/connect/${provider_lower}`;
};

export default {
  initiateTwitterOAuth,
  initiateFacebookOAuth,
  initiateLinkedInOAuth,
  initiateInstagramOAuth,
  initiateOAuth,
};
