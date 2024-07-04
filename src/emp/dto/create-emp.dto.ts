import { IsEmail, IsNumber, IsString } from 'class-validator';
export class CreateEmpDto {
  @IsString()
  name: string;
  @IsNumber()
  age: number;
  @IsEmail()
  email: string;
  id: number;
  @IsString()
  position: string;
  @IsNumber()
  salary: number;
  @IsString()
  password: string;
  @IsString()
  department: string;
  performance: number;
}
