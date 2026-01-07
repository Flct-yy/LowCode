import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PageMetadata } from './page-metadata.entity';

/**
 * 页面模型实体
 * 对应数据库中的page_model表
 */
@Entity()
export class PageModel {
  /**
   * 主键ID，自增
   */
  @PrimaryGeneratedColumn('increment')
  id!: bigint;

  /**
   * 组件树结构，JSON格式存储
   */
  @Column({ name: 'com_tree', type: 'json', nullable: false })
  com_tree!: JSON;

  /**
   * 缩放比例
   */
  @Column({name:'aspect_ratio', type:'varchar', length:20, nullable:false, default:'16/9'})
  aspect_ratio!:string;

  /**
   * 一对一关联到PageMetadata
   */
  @OneToOne(() => PageMetadata, (metadata) => metadata.pageModel, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  pageMetadata!: PageMetadata;
}