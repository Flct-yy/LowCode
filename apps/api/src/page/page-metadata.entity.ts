import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { PageModel } from './page-model.entity';

/**
 * 页面元信息实体
 * 对应数据库中的page_metadata表
 */
@Entity()
export class PageMetadata {
  /**
   * 主键ID，自增
   */
  @PrimaryGeneratedColumn('increment')
  id!: bigint;

  /**
   * 页面标题
   */
  @Column({ length: 255, nullable: false, unique: true })
  title!: string;

  /**
   * 页面描述
   */
  @Column({ type: 'text', nullable: false })
  description!: string;

  /**
   * 页面关键词数组
   */
  @Column({ type: 'text', array: true, nullable: false, default: '{}' })
  keywords!: string[];

  /**
   * 创建时间
   */
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  /**
   * 更新时间
   */
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  /**
   * 关联主表page_model的主键id
   */
  @Column({ name: 'model_id', type: 'bigint', nullable: false, unique: true })
  model_id!: bigint;

  /**
   * 一对一关联到PageModel
   */
  @OneToOne(() => PageModel, (pageModel) => pageModel.pageMetadata, { cascade: ['insert', 'update'], onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'model_id' })
  pageModel!: PageModel;
}