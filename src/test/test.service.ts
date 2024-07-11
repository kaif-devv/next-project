import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pizza } from './schema/pizzaSchema';
import { Model } from 'mongoose';
@Injectable()
export class TestService {
  constructor(@InjectModel(Pizza.name) private PizzaModel: Model<Pizza>) {}
  async create(pizz) {
    await this.PizzaModel.insertMany(pizz);
    return 'Created pizza';
    // return 'Multiple pizzas added';
  }

  async findAsPer() {
    // let x = await this.PizzaModel.find().exec();
    let x = await this.PizzaModel.aggregate([
      //Find Customers with High Frequency Orders
      {
        $group: {
          _id: '$customer.name',
          Average_price: { $sum: 1 },
        },
      },
      {
        $sort: {
          Average_price: -1,
        },
      }
      // {
      //   $match: {
      //     total_orders: { $gt: 1 },
      //   },
      // },
    ]);
    if (x.length == 0) {
      return { message: 'No customers found with multiple orders' };
    }  else {
      return x;
    }
  }
  async findOne(id: number) {
    return await this.PizzaModel.findById({ _id: id });
  }

  update(id: number, updateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
