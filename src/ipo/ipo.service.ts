import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIpoDto } from './dto/create-ipo.dto';
import { UpdateIpoDto } from './dto/update-ipo.dto';
import { Ipo } from './entities/ipo.entity';

@Injectable()
export class IpoService {
  constructor(
    @InjectRepository(Ipo)
    private readonly ipoRepository: Repository<Ipo>,
  ) {}

  async create(createIpoDto: CreateIpoDto): Promise<Ipo> {
    const newIpo = this.ipoRepository.create(createIpoDto);
    return await this.ipoRepository.save(newIpo);
  }

  async findAll(): Promise<Ipo[]> {
    return await this.ipoRepository.find();
  }

  async findOne(id: number): Promise<Ipo> {
    return await this.ipoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateIpoDto: UpdateIpoDto): Promise<Ipo> {
    await this.ipoRepository.update(id, updateIpoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Ipo> {
    const ipo = await this.findOne(id);
    if (ipo) {
      await this.ipoRepository.remove(ipo);
      return ipo;
    }
    return null;
  }
}
