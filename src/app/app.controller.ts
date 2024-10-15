import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
		const retorno = 'Retorno.'
    return retorno;
  }
	@Get('exemplo')
	exemplo():string {
		return this.appService.testeExemplo()
	}
}
