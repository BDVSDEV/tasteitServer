import ProductService from '../product';
import  ProductSelector  from '../product';

import { Product } from '@medusajs/medusa';

// Mocking the MedusaProductService methods
jest.mock('@medusajs/medusa', () => {
  return {
    ProductService: jest.fn().mockImplementation(() => {
      return {
        list: jest.fn(),
        listAndCount: jest.fn(),
        retrieve: jest.fn(),
        create: jest.fn(),
      };
    }),
  };
});

describe('ProductService', () => {
  let productService: ProductService;
  const mockContainer = { loggedInUser: { store_id: 'testStoreID' } };

  beforeEach(() => {
    productService = new ProductService(mockContainer, {});
  });

  test('list should set store_id from logged-in user if not provided', async () => {
    const mockProducts: Product[] = [];
    (productService as any).list.mockResolvedValueOnce(mockProducts);

    const selector: ProductSelector = {};
    const config = { select: [], relations: [] };

    const result = await productService.list(selector, config);
    expect(result).toEqual(mockProducts);
    expect(selector.store_id).toBe('testStoreID');
});


  // ... Add other tests ...

});
