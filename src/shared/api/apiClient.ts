export const apiClient = {
   get: async <T>(url: string): Promise<T> => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('response was not ok');
      return res.json();
   },
   post: async <T>(url: string, body: any): Promise<T> => {
      const res = await fetch(url, {
         method: 'POST',
         body: JSON.stringify(body),
         headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
         const error = await res.json().catch(() => ({}));
         throw new Error(error.message);
      }
      return res.json();
   },
};
