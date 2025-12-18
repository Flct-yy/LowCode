import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test_table') // 注意这里的表名要与数据库中一致
export class Test {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  value!: number;
}