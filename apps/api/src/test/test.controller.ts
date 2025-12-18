import { Controller, Get, Param } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  // 获取所有测试数据
  @Get('data')
  async getAllTestData() {
    return await this.testService.getAllTestData();
  }

  // 根据ID获取测试数据
  @Get('data/:id')
  async getTestDataById(@Param('id') id: string) {
    return await this.testService.getTestDataById(Number(id));
  }
}
