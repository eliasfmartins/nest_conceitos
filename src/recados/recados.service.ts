import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Este é um recado de teste',
      de: 'Joana',
      para: 'joão',
      lido: false,
      data: new Date(),
    },
  ];

  findAll() {
    return this.recados;
  }
  findOne(id: number) {
    const recado = this.recados.find(item => item.id === id);

    if (recado) return recado;

    // throw new HttpException(
    //   'Deu ruim não encontramos esse recado',
    //   HttpStatus.NOT_FOUND,
    // );
    throw new NotFoundException('Recado não encontrado');
  }
  create(createRecadoDto: CreateRecadoDto) {
    this.lastId++;
    const id = this.lastId;
    const newRecado = {
      id,
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };
    this.recados.push(newRecado);
    return newRecado;
  }
  update(id: string, updateRecadoDto: UpdateRecadoDto) {
    const recadoExistenteIndex = this.recados.findIndex(item => item.id == +id);

    if (recadoExistenteIndex < 0) {
      throw new NotFoundException('indice não encontrado');
    }

    if (recadoExistenteIndex >= 0) {
      const recadoExistente = this.recados[recadoExistenteIndex];

      this.recados[recadoExistenteIndex] = {
        ...recadoExistente,
        ...updateRecadoDto,
      };
    }
    return this.recados[recadoExistenteIndex];
  }

  remove(id: number) {
    const recadoExistenteIndex = this.recados.findIndex(item => item.id == id);

    if (recadoExistenteIndex < 0) {
      throw new NotFoundException('indice não encontrado');
    }

    const recado = this.recados[recadoExistenteIndex];
    this.recados.splice(recadoExistenteIndex, 1);
    return recado;
  }
}
