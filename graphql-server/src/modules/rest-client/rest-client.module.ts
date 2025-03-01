import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RestClientService } from 'src/modules/rest-client/rest-client.service';
import { RestClientResolver } from 'src/modules/rest-client/rest-client.resolver';

@Module({
  imports: [HttpModule], // Aquí está la corrección: usar HttpModule
  providers: [RestClientService, RestClientResolver],
  exports: [RestClientService],
})
export class RestClientModule {}
