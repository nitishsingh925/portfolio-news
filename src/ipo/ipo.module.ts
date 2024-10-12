import { Module } from '@nestjs/common';
import { IpoService } from './ipo.service';
import { IpoController } from './ipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ipo } from './entities/ipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ipo])],
  controllers: [IpoController],
  providers: [IpoService],
})
export class IpoModule {}
