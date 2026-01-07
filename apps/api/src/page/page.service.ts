import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetadata } from './page-metadata.entity';
import { PageModel } from './page-model.entity';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

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
  ) { }

  /**
   * 创建新页面
   * @param createPageDto 创建页面的数据
   * @returns 创建的页面信息
   */
  async createPage(createPageDto: CreatePageDto): Promise<void> {

    // 创建页面元信息
    const pageMetadata = this.pageMetadataRepository.create({
      title: createPageDto.title,
      description: createPageDto.description,
      keywords: createPageDto.keywords,
    });

    // 创建页面模型
    const pageModel = this.pageModelRepository.create({
      com_tree: createPageDto.comTree,
    });

    // 建立双向关联
    pageMetadata.pageModel = pageModel;
    pageModel.pageMetadata = pageMetadata;

    // 保存页面元信息（会级联保存页面模型）
    const savedMetadata = await this.pageMetadataRepository.save(pageMetadata);
  }

  /**
   * 根据ID获取页面
   * @param id 页面ID
   * @returns 页面信息
   */
  async getPageById(id: bigint): Promise<any> {
    const page = await this.pageMetadataRepository.findOne({
      where: { id },
      relations: ['pageModel'],
    });

    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }

    // 返回用户指定的数据结构
    return {
      pageMetadata: page,
      com_tree: page.pageModel.com_tree,
    };
  }

  /**
   * 根据ID获取组件树
   * @param id 页面ID
   * @returns 组件树
   */
  async getComTreeById(id: bigint): Promise<any> {
    const page = await this.pageMetadataRepository.findOne({
      where: { id },
      relations: ['pageModel'],
    });

    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }

    // 返回用户指定的数据结构
    return {
      com_tree: page.pageModel.com_tree,
    };
  }

  /**
   * 获取所有页面
   * @returns 所有页面的列表
   */
  async getAllPages(): Promise<any[]> {
    // 使用pageMetadataRepository查询所有页面元信息
    return await this.pageMetadataRepository.find();
  }

  /**
   * 更新页面
   * @param id 页面ID
   * @param updatePageDto 更新页面的数据
   * @returns 更新后的页面信息
   */
  async updatePage(id: bigint, updatePageDto: UpdatePageDto): Promise<any> {
    // 查找页面
    const { pageMetadata } = await this.getPageById(id);

    // 更新页面元信息
    if (updatePageDto.title) pageMetadata.title = updatePageDto.title;
    if (updatePageDto.description) pageMetadata.description = updatePageDto.description;
    if (updatePageDto.keywords) pageMetadata.keywords = updatePageDto.keywords;

    // 保存更新后的元信息
    const updatedMetadata = await this.pageMetadataRepository.save(pageMetadata);

    // 获取当前的组件树，默认为原有组件树
    let updatedComTree = updatedMetadata.pageModel?.com_tree;

    // 如果有组件树更新，也更新页面模型
    if (updatePageDto.comTree) {
      // 查找关联的页面模型
      const pageModel = await this.pageModelRepository.findOne({
        where: { pageMetadata: { id: updatedMetadata.id } },
      });

      if (pageModel) {
        pageModel.com_tree = updatePageDto.comTree;
        updatedComTree = updatePageDto.comTree;
        await this.pageModelRepository.save(pageModel);
      }
    }

    // 返回用户指定的数据结构
    return {
      pageMetadata: updatedMetadata,
      com_tree: updatedComTree,
    };
  }

  /**
   * 删除页面
   * @param id 页面元信息ID
   */
  async deletePage(id: bigint): Promise<void> {
    try {
      // 删除页面元信息（会级联删除页面模型）
      const modelResult = await this.pageModelRepository.delete(Number(id));

      // 检查是否有任一删除操作成功
      if (modelResult.affected === 0) {
        throw new NotFoundException(`Page with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to delete page');
      }
    }
  }
}