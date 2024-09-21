require('dotenv').config();
const request = require('supertest');
const { app } = require('../api/index');
const axiosInstance = require('../api/supabaseInstance');
jest.mock('../api/supabaseInstance');
describe('API Routes', () => {
  let snackId = null;
  beforeAll(() => {
    snackId = null;
  });
  afterAll(() => {
    // Optionally clean up if needed
  });
  it('should return all snacks', async () => {
    const mockSnacks = [
      { id: 1, name: 'Chips', description: 'Crunchy potato chips', price: 1.5, category: 'Salty', inStock: true },
    ];
    axiosInstance.get.mockResolvedValue({ data: mockSnacks });
    const response = await request(app)
      .get('/api/snacks')
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSnacks);
  });
  it('should create a new snack', async () => {
    const newSnack = {
      name: 'Chips',
      description: 'Crunchy potato chips',
      price: 1.5,
      category: 'Salty',
      inStock: true,
    };
    const createdSnack = { id: 1, ...newSnack };
    axiosInstance.post.mockResolvedValue({ data: createdSnack });
    const response = await request(app)
      .post('/api/snacks')
      .set("api-key", process.env.ADMIN_API_KEY)
      .send(newSnack);
    console.log('Create Snack Response:', response.body); // Debugging
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newSnack);
    expect(response.body).toHaveProperty('id');
    snackId = response.body.id;
    console.log(`Created snack with ID: ${snackId}`);
  });
  it('should return a snack by ID', async () => {
    if (snackId === null) {
      throw new Error('No valid snack ID available for testing');
    }
    const mockSnack = {
      id: snackId,
      name: 'Chips',
      description: 'Crunchy potato chips',
      price: 1.5,
      category: 'Salty',
      inStock: true,
    };
    axiosInstance.get.mockResolvedValue({ data: [mockSnack] });
    const response = await request(app)
      .get(`/api/snacks/${snackId}`)
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(mockSnack);
  });
  // it('should update a snack by ID', async () => { if (snackId === null) 
  //   { throw new Error('No valid snack ID available for testing'); } 
  //   const updatedSnack = { name: 'Updated Chips', description: 'Crunchier potato chips', price: 2.0, category: 'Salty', inStock: false, }; 
  //   // Mock the GET request to check if the snack exists axiosInstance.get.mockResolvedValue
  //   ({ data: [{ id: snackId }] }); 
  //   // Mock the PATCH request for updating the snack axiosInstance.patch.mockResolvedValue
  //   ({ data: { id: snackId, ...updatedSnack } }); const response = await request(app) .patch(`/api/snacks/${snackId}`) .set("api-key", process.env.ADMIN_API_KEY) 
  //   // Ensure this header is included 
  //   .send(updatedSnack);
  //    // Send the updated snack data// Assert the response status and body
  //    expect(response.status).toBe(200); 
  //    expect(response.body).toMatchObject({ id: snackId, ...updatedSnack }); });


  it('should update a snack by ID', async () => {
    if (snackId === null) {
        throw new Error('No valid snack ID available for testing');
    }
    const updatedSnack = {
        name: 'Updated Chips',
        description: 'Crunchier potato chips',
        price: 2.0,
        category: 'Salty',
        inStock: false,
    };
    // Mock the GET request to check if the snack exists
    axiosInstance.get.mockResolvedValue({ data: [{ id: snackId, ...updatedSnack }] });
    // Mock the PATCH request for updating the snack
    axiosInstance.patch.mockResolvedValue({ data: { id: snackId, ...updatedSnack } });
    const response = await request(app)
        .patch(`/api/snacks/${snackId}`)
        .set("api-key", process.env.ADMIN_API_KEY)
        .send(updatedSnack);
    console.log('Update Snack Response:', response.body); // Debugging output
    // Assert the response status and body
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: snackId, ...updatedSnack });
});




  it('should delete a snack by ID', async () => {
    if (snackId === null) {
      throw new Error('No valid snack ID available for testing');
    }
    axiosInstance.delete.mockResolvedValue({ data: { message: 'Snack deleted successfully' } });
    await request(app)
      .delete(`/api/snacks/${snackId}`)
      .set("api-key", process.env.ADMIN_API_KEY);
    axiosInstance.get.mockResolvedValue({ data: [] });
    const response = await request(app)
      .get(`/api/snacks/${snackId}`)
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Snack not found');
  });
});