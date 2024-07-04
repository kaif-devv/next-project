import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Employee {
  @Prop()
  name: string;
  @Prop()
  age: number;
  @Prop()
  email: string;
  @Prop()
  id: number;
  @Prop()
  position: string;
  @Prop()
  salary: number;
  @Prop()
  password: string;
  @Prop()
  department: string;
  @Prop()
  performance: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
