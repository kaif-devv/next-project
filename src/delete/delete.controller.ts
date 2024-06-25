import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DeleteService } from './delete.service';

@Controller('delete')
export class DeleteController {
  constructor(
    private readonly deleteService: DeleteService,
  ) {}

  @Delete('/:id')
  deleteById(@Param('id', ParseIntPipe) id: number): string {
    console.log("The id is "+ id);
    return this.deleteService.delById(id);
  }
}
