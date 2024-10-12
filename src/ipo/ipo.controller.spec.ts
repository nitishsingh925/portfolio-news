import { Test, TestingModule } from '@nestjs/testing';
import { IpoController } from './ipo.controller';
import { IpoService } from './ipo.service';

describe('IpoController', () => {
  let controller: IpoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpoController],
      providers: [IpoService],
    }).compile();

    controller = module.get<IpoController>(IpoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
