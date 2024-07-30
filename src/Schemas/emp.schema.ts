import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Department, Role, Position } from 'src/interfaces';
@Schema()
//Employee Schema
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
  position: Position;
  @Prop()
  salary: number;
  @Prop()
  password: string;
  @Prop()
  department: Department;
  @Prop()
  performance: number;
  @Prop()
  role: Role;
}

@Schema()
export class History {
  @Prop()
  EmpId: string;

  @Prop()
  updatedOn: Date;

  @Prop(
    raw({
      prev: { type: String },
      new: { type: String },
    }),
  )
  name: Record<string, any>;

  @Prop(
    raw({
      prev: { type: Number },
      new: { type: Number },
    }),
  )
  age: Record<string, any>;

  @Prop(
    raw({
      prev: { type: String },
      new: { type: String },
    }),
  )
  email: Record<string, any>;

  @Prop(
    raw({
      prev: { type: String },
      new: { type: String },
    }),
  )
  position: Record<Position, any>;

  @Prop(
    raw({
      prev: { type: Number },
      new: { type: Number },
    }),
  )
  salary: Record<string, any>;

  @Prop(
    raw({
      prev: { type: String },
      new: { type: String },
    }),
  )
  department: Record<Department, any>;

  @Prop(
    raw({
      prev: { type: Number },
      new: { type: Number },
    }),
  )
  performance: Record<string, any>;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
export const HistorySchema = SchemaFactory.createForClass(History);
