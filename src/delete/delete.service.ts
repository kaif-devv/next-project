import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service.service';
import * as fs from 'fs';

@Injectable()
export class DeleteService {
  constructor(private readonly shared: SharedService) {}
  delById(id: number) {
    const empjson = this.shared.getJson();
    const data = empjson.filter((e) => e.id !== id);
    fs.writeFileSync(this.shared.dataPath(), JSON.stringify(data));
    return 'Employee deleted sucessfully';
  }
}
