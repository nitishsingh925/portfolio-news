import { PartialType } from '@nestjs/swagger';
import { CreateIpoDto } from './create-ipo.dto';

export class UpdateIpoDto extends PartialType(CreateIpoDto) {}
