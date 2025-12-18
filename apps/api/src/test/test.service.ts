import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './test.entity';

// 定义测试表实体
@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) // 使用实体类注入
    private testTableRepository: Repository<any>,
  ) {}

  // 获取所有测试数据
  async getAllTestData(): Promise<any[]> {
    return await this.testTableRepository.find();
  }

  // 根据ID获取测试数据
  async getTestDataById(id: number): Promise<any> {
    return await this.testTableRepository.findOneBy({ id });
  }
}
