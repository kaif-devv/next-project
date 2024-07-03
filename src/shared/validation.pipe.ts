import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
type Department = 'frontend' | 'backend' | 'fullstack';
type Position = 'SDE1' | 'SDE2' | 'SDE3';

@Injectable()
export class FiledsExistPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { name, age, email, password, salary, position, department } = value;
    if (
      !name ||
      !age ||
      !position ||
      !password ||
      !salary ||
      !email ||
      !department
    ) {
      throw new BadRequestException('All Fields are reqired');
    }
    return value;
  }
}

export class UpdateFiledsExistPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    
    const { name, age, email, password, salary, position, department } = value;

    if (
      !name &&
      !age &&
      !position &&
      !password &&
      !salary &&
      !email &&
      !department
    ) {
      
      throw new BadRequestException('Atleast one Field is required');
    }
    return value;
  }
}




export class DataValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    //Name verification
    let name: string = value.name;
    if (name) {
      if (name.charAt(0) <= '9')
        throw new BadRequestException('Name should start with a letter');
      if (name.length < 3)
        throw new BadRequestException('Name should contain atleast 3 letters');
    }

    //Password verification
    let password: any = value.password;
    if (password) {
      const specialCharRegex: any = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      let capitalFlag: boolean = false;
      let numFlag: boolean = false;
      let smallFlag: boolean = false;
      let specialFlag: boolean = false;

      for (let i = 0; i < password.length; i++) {
        const char: string = password[i];
        if (/[A-Z]/.test(char)) {
          capitalFlag = true;
        } else if (/[a-z]/.test(char)) {
          smallFlag = true;
        } else if (/[0-9]/.test(char)) {
          numFlag = true;
        } else if (specialCharRegex.test(char)) {
          specialFlag = true;
        }
      }
      if (!capitalFlag || !numFlag || !specialFlag || !smallFlag) {
        throw new BadRequestException(
          'Password must include uppercase, lowercase, number, and special character',
        );
      }
    }
    //Age verification
    let age: number = value.age;
    if (age && (age < 18 || age > 60)) {
      throw new BadRequestException('Enter the valid age');
    }

    let dpt: Department = value.department;
    if (dpt) {
      const validDepartments: Department[] = [
        'frontend',
        'backend',
        'fullstack',
      ];
      if (!validDepartments.includes(dpt)) {
        throw new BadRequestException('Enter the correct department');
      }
    }
    //Position verification

    let pos: Position = value.position;
    if (pos) {
      const validPositions: Position[] = ['SDE1', 'SDE2', 'SDE3'];
      if (!validPositions.includes(pos)) {
        throw new BadRequestException('Enter the correct position');
      }
    }
    //Performance verification

    let perf: number = value.performance;
    if (perf && (perf < 0 || perf > 5)) {
      throw new BadRequestException(
        'Enter the performance range between 0 and 5',
      );
    }
    return value;
  }
}
