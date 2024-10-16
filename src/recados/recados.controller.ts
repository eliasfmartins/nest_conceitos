import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
	@HttpCode(201)
	@Get()
	findAll() {
		return 'Estamos trabalhando nisso "-" '
	}
	@Get(':id')
	findOne(@Param('id') id: string) {
		return `essa rota deve retornar ${id} only one result`
	}
	@Post()
	create(@Body() body: any) {
		return body
	}
}
