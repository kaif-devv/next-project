import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PutService } from './put.service';

@Controller('put')
export class PutController {
  constructor(private readonly putService: PutService) {}

  @Get('/')
  findAll() {
    return this.putService.findAll();
  }

}
