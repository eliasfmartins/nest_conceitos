import { Controller, Get, Param } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
	@Get()
	findAll() {
		return 'Estamos trabalhando nisso "-" '
	}
	@Get(':id')
	findOne(@Param('id') id: string) {
		return `essa rota deve retornar ${id} only one result`
	}
}
