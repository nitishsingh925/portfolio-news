import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IpoService } from './ipo.service';
import { CreateIpoDto } from './dto/create-ipo.dto';
import { UpdateIpoDto } from './dto/update-ipo.dto';

@Controller('ipo')
export class IpoController {
  constructor(private readonly ipoService: IpoService) {}

  @Post()
  create(@Body() createIpoDto: CreateIpoDto) {
    return this.ipoService.create(createIpoDto);
  }

  @Get()
  findAll() {
    return this.ipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ipoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIpoDto: UpdateIpoDto) {
    return this.ipoService.update(+id, updateIpoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ipoService.remove(+id);
  }
}
