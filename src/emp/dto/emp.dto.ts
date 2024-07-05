import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateEmpDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  age: number;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  id: number;
  @IsNotEmpty()
  @IsString()
  position: string;
  @IsNotEmpty()
  @IsNumber()
  salary: number;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  department: string;
  performance: number;
}

export class UpdateEmpDto  {
  @IsString()
  name?: string;
  @IsNumber()
  age?: number;
  @IsEmail()
  email?: string;
  @IsString()
  position?: string;
  @IsNumber()
  salary?: number;
  @IsString()
  password?: string;
  @IsString()
  department?: string;
  @IsNumber()
  performance?: number;
  @IsString()
  joinDate?: string;
  @IsString()
  prevPassword?: any;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}