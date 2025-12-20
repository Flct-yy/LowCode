import { Repository } from 'typeorm';
import { PageMetadata } from './page-metadata.entity';
import { PageModel } from './page-model.entity';

/**
 * 页面仓库接口
 * 扩展TypeORM的Repository接口，添加自定义查询方法
 */
export interface PageRepository extends Repository<PageMetadata> {
  /**
   * 根据标题查找页面
   * @param title 页面标题
   * @returns 找到的页面元信息，或undefined
   */
  findByTitle(title: string): Promise<PageMetadata | undefined>;
  
  /**
   * 获取所有页面
   * @returns 只是页面元信息数组
   */
  findWithModel(): Promise<(PageMetadata)[]>;
}