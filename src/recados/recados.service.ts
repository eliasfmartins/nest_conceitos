import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
  ) {}

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

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados;
  }
  async findOne(id: number) {
    // const recado = this.recados.find(item => item.id === id);
    const recado = await this.recadoRepository.findOne({
      where: { id },
    });

    if (recado) return recado;

    // throw new HttpException(
    //   'Deu ruim não encontramos esse recado',
    //   HttpStatus.NOT_FOUND,
    // );
    throw new NotFoundException('Recado não encontrado');
  }
  async create(createRecadoDto: CreateRecadoDto) {
    const novoRecado = {
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };

    const recado = await this.recadoRepository.create(novoRecado);
    return this.recadoRepository.save(recado);
  }
  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateRecadoDto = {
      lido: updateRecadoDto?.lido,
      texto: updateRecadoDto?.texto,
    };
    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpdateRecadoDto,
    });
    if (!recado) {
      throw new NotFoundException('recado não encontrado');
    }
    await this.recadoRepository.save(recado);
    return recado;
  }

  async remove(id: number) {
    // const recadoExistenteIndex = this.recados.findIndex(item => item.id == id);
    const recado = await this.recadoRepository.findOneBy({
      id,
    });
    if (!recado) {
      throw new NotFoundException('recado não encontrado');
    }
    return this.recadoRepository.remove(recado);
  }
}
