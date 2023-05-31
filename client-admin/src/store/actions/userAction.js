import { baseUrl } from '../baseUrl';

export function registerAdmin(registerForm) {
  return async () => {
    try {
      const response = await fetch(baseUrl + '/users/register', {
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token'),
          'content-type': 'application/json',
        },
        body: JSON.stringify(registerForm),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const data = await response.json();
    } catch (error) {
      throw error;
    }
  };
}
