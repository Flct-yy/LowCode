import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageModule } from './page/page.module';

/**
 * 应用程序根模块
 * 导入并配置所有依赖模块
 */
@Module({
  imports: [
    // 配置模块，用于加载环境变量
    ConfigModule.forRoot(),
    // TypeORM模块配置
    TypeOrmModule.forRoot({
      type: 'postgres', // 数据库类型
      host: process.env.DB_HOST || 'localhost', // 数据库主机
      port: parseInt(process.env.DB_PORT || '', 10) || 5432, // 数据库端口
      username: process.env.DB_USERNAME || 'postgres', // 数据库用户名
      password: process.env.DB_PASSWORD || 'password', // 数据库密码
      database: process.env.DB_DATABASE || 'LowCode', // 数据库名称
      autoLoadEntities: true, // 自动加载实体
    }),
    // 页面模块
    PageModule,
  ],
  controllers: [AppController], // 应用控制器
  providers: [AppService], // 应用服务
})
export class AppModule {}