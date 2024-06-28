import { Controller, Delete, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { DeleteService } from './delete.service';
import { JwtGuard } from 'src/auth/auth.guard';
@Controller('delete')
@UseGuards(JwtGuard)
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
