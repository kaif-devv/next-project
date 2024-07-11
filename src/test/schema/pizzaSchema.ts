import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Pizza {
  @Prop()
  _id: number;
  @Prop()
  name: string;
  @Prop()
  size: string;
  @Prop()
  price: number;
  @Prop()
  quantity: number;
  @Prop()
  date: Date;
  @Prop()
  topping: string[];
  @Prop(
    raw({
      name: { type: String },
      address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        country: { type: String },
      },
      contact: {
        phone: { type: String },
        email: { type: String },
      },
    }),
  )
  customer: Record<string, any>;
  @Prop()
  order_id: string;
  @Prop(
    raw({
      scheduled_date: { type: Date },
      address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        country: { type: String },
      },
    instructions: { type: String },
    }),
  )
  delivery: Record<string, any>;
  @Prop()
  instructions: string;
  @Prop(
    raw({
      method: { type: String },
      card: {
        type: { type: String },
        last_digits: { type: String },
      },
      total_amount: { type: Number },
    }),
  )
  payment: Record<string, any>;
  @Prop()
  special_instructions: string;
}

export const pizzaSchema = SchemaFactory.createForClass(Pizza);
