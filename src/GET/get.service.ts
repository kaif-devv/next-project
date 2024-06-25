import { Injectable } from '@nestjs/common';
import { empSchema } from 'src/interfaces';
import { SharedService } from 'src/shared/shared.service.service';

@Injectable()
export class GetService {
  constructor(private readonly shared: SharedService){}


  getById(id: number): empSchema {
    const empSchema: empSchema[]= this.shared.getJson();
   let ind = empSchema.findIndex((e)=> e.id === id)
   return empSchema[ind]
  }

 
  getByName(name: string): empSchema[] {
    const empSchema: empSchema[] = this.shared.getJson();
    console.log('All employee data:', empSchema);
    let data = empSchema.filter((e) => e.name === name);
    console.log('Filtered data:', data);
    return data;
  }
}



