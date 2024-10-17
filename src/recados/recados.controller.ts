import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RecadosService } from './recados.service';

@Controller('recados')
export class RecadosController {
  constructor(private readonly RecadosService: RecadosService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.RecadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.RecadosService.findOne(id);
  }
  @Post()
  create(@Body() body: any) {
    return this.RecadosService.create(body);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      id,
      ...body,
    };
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Essa rota APAGA o recado com id ${id}`;
  }
}
