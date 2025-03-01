import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RestClientService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>(
      'REST_API_URL',
      'http:localhost:8080/',
    );
  }

  async sendStudentData(student: {
    codigo: string;
    estado: string;
    nombres: string;
    apellidos: string;
    direccion: string;
  }) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(this.apiUrl, student)
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error calling REST API: ${error.message}`);
    }
  }
}
