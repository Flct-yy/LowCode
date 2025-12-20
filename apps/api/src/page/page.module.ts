import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageMetadata } from './page-metadata.entity';
import { PageModel } from './page-model.entity';
import { PageController } from './page.controller';
import { PageService } from './page.service';

/**
 * 页面模块
 * 组织页面相关的控制器、服务和实体
 */
@Module({
  /**
   * 导入TypeORM模块，注册页面相关的实体
   */
  imports: [TypeOrmModule.forFeature([PageMetadata, PageModel])],
  /**
   * 注册页面控制器
   */
  controllers: [PageController],
  /**
   * 注册页面服务
   */
  providers: [PageService],
  /**
   * 导出页面服务，供其他模块使用
   */
  exports: [PageService],
})
export class PageModule {}