export const apiFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.status === 429) {
      // Dispatch event for rate limit exceeded
      window.dispatchEvent(new CustomEvent('rate-limit-exceeded'));
      
      // Optionally throw error to stop further processing in the caller
      const data = await response.json();
      throw new Error(data.msg || 'Daily API limit exceeded');
    }

    return response;
  } catch (error) {
    throw error;
  }
};
