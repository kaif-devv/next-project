import { Prop, Schema, SchemaFactory,raw } from '@nestjs/mongoose';
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

@Schema()
export class History {
  @Prop()
  EmpId: string;

  @Prop()
  updatedOn: Date;

  @Prop(raw({
    prevName: { type: String },
    newName: { type: String }
  }))
  name: Record<string, any>;

  @Prop(raw({
    prevAge: { type: Number },
    newAge: { type: Number }
  }))
  age: Record<string, any>;

  @Prop(raw({
    prevEmail: { type: String },
    newEmail: { type: String }
  }))
  email: Record<string, any>;

  @Prop(raw({
    prevPosition: { type: String },
    newPosition: { type: String }
  }))
  position: Record<string, any>;

  @Prop(raw({
    prevSalary: { type: Number },
    newSalary: { type: Number }
  }))
  salary: Record<string, any>;

  @Prop(raw({
    prevDepartment: { type: String },
    newDepartment: { type: String }
  }))
  department: Record<string, any>;
  
  @Prop(raw({
    prevPerformance: { type: Number },
    newPerformance: { type: Number }
  }))
  performance: Record<string, any>;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
export const HistorySchema = SchemaFactory.createForClass(History);
