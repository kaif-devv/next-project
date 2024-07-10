import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Max, Min } from 'class-validator';
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
  @IsIn(['SDE1', 'SDE2', 'SDE3'])
  position: string;

  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['frontend', 'backend', 'fullstack'])
  department: string;

  performance: number;
}

export class UpdateEmpDto  {
  @IsString()
  name?: string;
  @IsNumber()
  @Min(18)
  @Max(60)
  age?: number;
  @IsEmail()
  email?: string;
  @IsString()
  @IsIn(['SDE1', 'SDE2', 'SDE3'])
  position?: string;
  @IsNumber()
  salary?: number;
  @IsString()
  @IsStrongPassword()
  password?: string;
  @IsString()
  @IsIn(['frontend', 'backend', 'fullstack'])
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

export class dptDto {
  @IsNotEmpty()
  @IsIn(['frontend', 'backend', 'fullstack'])
  department: string;
}

