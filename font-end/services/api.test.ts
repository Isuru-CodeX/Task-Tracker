import { getTasks } from './api';

describe('API Error Handling', () => {
  let originalFetch: typeof global.fetch;

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('should handle non-JSON error response gracefully (catch block in readError)', async () => {
    // Mock fetch to return a non-ok response with non-JSON text
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: jest.fn().mockResolvedValue('Internal Server Error: Something went wrong')
    });

    await expect(getTasks(1)).rejects.toThrow('Internal Server Error: Something went wrong');
  });
});
