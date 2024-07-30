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
  @Prop()
  role: string;
}

@Schema()
export class History {
  @Prop()
  EmpId: string;

  @Prop()
  updatedOn: Date;

  @Prop(raw({
    prev: { type: String },
    new: { type: String }
  }))
  name: Record<string, any>;

  @Prop(raw({
    prev: { type: Number },
    new: { type: Number }
  }))
  age: Record<string, any>;

  @Prop(raw({
    prev: { type: String },
    new: { type: String }
  }))
  email: Record<string, any>;

  @Prop(raw({
    prev: { type: String },
    new: { type: String }
  }))
  position: Record<string, any>;

  @Prop(raw({
    prev: { type: Number },
    new: { type: Number }
  }))
  salary: Record<string, any>;

  @Prop(raw({
    prev: { type: String },
    new: { type: String }
  }))
  department: Record<string, any>;
  
  @Prop(raw({
    prev: { type: Number },
    new: { type: Number }
  }))
  performance: Record<string, any>;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
export const HistorySchema = SchemaFactory.createForClass(History);
