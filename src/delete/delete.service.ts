import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import * as fs from 'fs';

@Injectable()
export class DeleteService {
  constructor(private readonly shared: SharedService) {}

  // Method to delete an employee by ID
  delById(id: number) {
    // Get the employee data from the shared service
    const empjson = this.shared.getJson();

    // Filter out the employee with the specified ID
    const data = empjson.filter((e) => e.id !== id);

    // Write the updated data back to the file
    fs.writeFileSync(this.shared.dataPath(), JSON.stringify(data));

    // Return success message
    return 'Employee deleted successfully';
  }
}
