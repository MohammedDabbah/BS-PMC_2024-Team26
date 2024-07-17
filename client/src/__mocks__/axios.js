const axios = {
    post: jest.fn(() => Promise.resolve({ data: {} })),
    // Add other methods if needed
  };
  
  export default axios;
  