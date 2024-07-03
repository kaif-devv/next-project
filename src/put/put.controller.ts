import { Controller, Body, Param, ParseIntPipe, Put, UsePipes } from '@nestjs/common';
import { PutService } from './put.service';
import { updateInterface } from 'src/interfaces';
import { DataValidationPipe } from 'src/shared/validation.pipe';

@Controller('update')
export class PutController {
  constructor(private readonly putService: PutService) {}

  @Put('/:id')
  @UsePipes(new DataValidationPipe())
  updateEmp(@Param('id', ParseIntPipe) id: number, @Body() emp: updateInterface) {
    return this.putService.updateEmp(id, emp);
  }
}
