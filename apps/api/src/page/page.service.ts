import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetadata } from './page-metadata.entity';
import { PageModel } from './page-model.entity';
import { Repository } from 'typeorm';

/**
 * 创建页面的DTO接口
 */
interface CreatePageDto {
  /**
   * 页面标题
   */
  title: string;
  /**
   * 页面描述
   */
  description?: string;
  /**
   * 页面关键词数组
   */
  keywords?: string[];
  /**
   * 组件树结构
   */
  comTree: any;
}

/**
 * 更新页面的DTO接口
 */
interface UpdatePageDto {
  /**
   * 页面标题
   */
  title?: string;
  /**
   * 页面描述
   */
  description?: string;
  /**
   * 页面关键词数组
   */
  keywords?: string[];
  /**
   * 组件树结构
   */
  comTree?: any;
}

/**
 * 页面服务
 * 提供页面相关的业务逻辑
 */
@Injectable()
export class PageService {
  constructor(
    /**
     * 注入页面元信息仓库
     */
    @InjectRepository(PageMetadata) 
    private readonly pageMetadataRepository: Repository<PageMetadata>,
    /**
     * 注入页面模型仓库
     */
    @InjectRepository(PageModel) 
    private readonly pageModelRepository: Repository<PageModel>
  ) {}

  /**
   * 创建新页面
   * @param createPageDto 创建页面的数据
   * @returns 创建的页面信息
   */
  async createPage(createPageDto: CreatePageDto): Promise<PageMetadata> {
    // 创建页面元信息
    const pageMetadata = this.pageMetadataRepository.create({
      title: createPageDto.title,
      description: createPageDto.description,
      keywords: createPageDto.keywords,
    });

    // 保存页面元信息
    const savedMetadata = await this.pageMetadataRepository.save(pageMetadata);

    // 创建页面模型
    const pageModel = this.pageModelRepository.create({
      metadata_id: savedMetadata.id,
      com_tree: createPageDto.comTree,
      metadata: savedMetadata,
    });

    // 保存页面模型
    await this.pageModelRepository.save(pageModel);

    // 返回包含模型的完整页面信息
    const result = await this.pageMetadataRepository.findOne({
      where: { id: savedMetadata.id },
      relations: ['pageModel'],
    });

    if (!result) {
      throw new NotFoundException(`Page with ID ${savedMetadata.id} not found`);
    }

    return result;
  }

  /**
   * 根据ID获取页面
   * @param id 页面ID
   * @returns 页面信息
   */
  async getPageById(id: bigint): Promise<PageMetadata> {
    const page = await this.pageMetadataRepository.findOne({
      where: { id },
      relations: ['pageModel'],
    });

    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }

    return page;
  }

  /**
   * 获取所有页面
   * @returns 所有页面的列表
   */
  async getAllPages(): Promise<PageMetadata[]> {
    return this.pageMetadataRepository.find({
      relations: ['pageModel'],
    });
  }

  /**
   * 更新页面
   * @param id 页面ID
   * @param updatePageDto 更新页面的数据
   * @returns 更新后的页面信息
   */
  async updatePage(id: bigint, updatePageDto: UpdatePageDto): Promise<PageMetadata> {
    // 查找页面
    const page = await this.getPageById(id);

    // 更新页面元信息
    if (updatePageDto.title) page.title = updatePageDto.title;
    if (updatePageDto.description) page.description = updatePageDto.description;
    if (updatePageDto.keywords) page.keywords = updatePageDto.keywords;

    // 保存更新后的元信息
    const updatedMetadata = await this.pageMetadataRepository.save(page);

    // 如果有组件树更新，也更新页面模型
    if (updatePageDto.comTree) {
      const pageModel = await this.pageModelRepository.findOne({
        where: { metadata_id: id },
      });

      if (pageModel) {
        pageModel.com_tree = updatePageDto.comTree;
        await this.pageModelRepository.save(pageModel);
      }
    }

    // 返回更新后的完整页面信息
    const result = await this.pageMetadataRepository.findOne({
      where: { id },
      relations: ['pageModel'],
    });

    if (!result) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }

    return result;
  }

  /**
   * 删除页面
   * @param id 页面ID
   */
  async deletePage(id: bigint): Promise<void> {
    const result = await this.pageMetadataRepository.delete(Number(id));
    if (result.affected === 0) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
  }
}