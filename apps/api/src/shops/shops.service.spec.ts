import { Test, TestingModule } from '@nestjs/testing';
import { ShopsService } from './shops.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { User } from '../users/entities/user.entity';
import { Order } from './orders/entities/order.entity';
import { Product } from './products/entities/product.entity';
import { AwsService } from '../aws/aws.service';
import { CategoriesService } from './categories/categories.service';
import { CreateShopDto } from './dto/create-shop.dto';

describe('ShopsService', () => {
  let service: ShopsService;
  const userId = 'user_id';
  const createShopDto: CreateShopDto = {
    name: 'MyShop',
    description: 'The name of the shop',
    categoryId: 'hello_id',
    phone: '1234567890',
    address: 'White Hoouse Nakuru',
  };
  const shopId = 'shop_id';

  const mockShopRepo = {
    create: jest.fn((createShopDto: CreateShopDto, email: string) => {
      return {
        ...createShopDto,
        id: shopId,
        user: {
          id: userId,
          email,
        },
        banner: {
          id: 'id',
          signedUrl: 'signed_url',
        },
      };
    }),

    // findOneBy: jest.fn(({ name }) => Promise.resolve('')),
  };
  const mockUserRepo = {};
  const mockOrderRepo = {};
  const mockProductRepo = {};
  const mockAwsService = {};
  const mockCategoryService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopsService,
        {
          provide: getRepositoryToken(Shop),
          useValue: mockShopRepo,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo,
        },
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepo,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepo,
        },
        {
          provide: AwsService,
          useValue: mockAwsService,
        },
        {
          provide: CategoriesService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    service = module.get<ShopsService>(ShopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new shop', () => {
    expect(mockShopRepo.create(createShopDto, 'janedoe@gmail.com')).toEqual({
      ...createShopDto,
      id: shopId,
      user: {
        id: userId,
        email: 'janedoe@gmail.com',
      },
      banner: {
        id: 'id',
        signedUrl: 'signed_url',
      },
    });

    expect(mockShopRepo.create).toHaveBeenCalled();
  });
});
