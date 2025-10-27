import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsModule } from './aws/aws.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import config from './lib/config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { typeOrmAsyncConfig } from '../db/data-source';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './shops/products/products.module';
import { ImagesModule } from './shops/product_images/images.module';
import { ProductSizesModule } from './shops/product_sizes/product_sizes.module';
import { FaqsModule } from './faqs/faqs.module';
import { GalleriesModule } from './galleries/galleries.module';
import { BlogsModule } from './blogs/blogs.module';
import { JobsModule } from './jobs/jobs.module';
import { ResourceFilesModule } from './resource-files/resource-files.module';
import { TendersModule } from './tenders/tenders.module';
import { ShopsModule } from './shops/shops.module';
import { ChatsModule } from './chat/chats.module';
import { SessionsModule } from './sessions/sessions.module';
import { WeaviateModule } from './weaviate/weaviate.module';
import { OrdersModule } from './shops/orders/orders.module';
import { PaymentsModule } from './shops/payments/payments.module';
import { CartsModule } from './shops/carts/carts.module';
import { ProductVideosModule } from './product-videos/product-videos.module';
import { ProductCommentsModule } from './product-comments/product-comments.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AnalyticsModule } from './analytics/analytics.module';
import { DiscordModule } from './discord/discord.module';
import { DemoModule } from './demo/demo.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheableMemory, Keyv } from 'cacheable';
import { createKeyv } from '@keyv/redis';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { UserAgentMiddleware } from '../utils/middlewares/user-agent.middleware';

@Module({
  imports: [
    AwsModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [config],
    }),
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 0, lruSize: 5000 }),
            }),
            createKeyv(process.env.REDIS_URL),
          ],
        };
      },
      isGlobal: true,
    }),
    AuthModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ProductsModule,
    ImagesModule,
    ProductSizesModule,
    ShopsModule,
    ChatsModule,
    FaqsModule,
    GalleriesModule,
    BlogsModule,
    JobsModule,
    ResourceFilesModule,
    TendersModule,
    SessionsModule,
    WeaviateModule,
    OrdersModule,
    ShopsModule,
    PaymentsModule,
    CartsModule,
    ProductVideosModule,
    ProductCommentsModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 6000,
          limit: 10,
        },
      ],
    }),
    AnalyticsModule,
    DiscordModule,
    DemoModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAgentMiddleware).forRoutes('products', 'analytics');
  }
}
