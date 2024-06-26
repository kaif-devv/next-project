import { Controller, Body, Param, ParseIntPipe, Put } from '@nestjs/common';
import { PutService } from './put.service';
import { updateSchema } from 'src/interfaces';

@Controller('update')
export class PutController {
  constructor(private readonly putService: PutService) {}

  @Put('/:id')
  updateEmp(@Param('id', ParseIntPipe) id: number, @Body() emp: updateSchema) {
    return this.putService.updateEmp(id, emp);
  }
}
