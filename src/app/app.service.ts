import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello Worlds!';
	}

	testeExemplo(){
		return 'Exemplo usa o service.'

	}
}
