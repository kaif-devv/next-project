export interface empInterface {
  name: string;
  age: number;
  email: string;
  id: number;
  position: string;
  salary: number;
  password: string;
  department: string;
  performance: number;
  joinDate?: string;
  prevpassword?: any;
}

export interface updateInterface  {
  id?: number;
  name?: string;
  age?: number;
  email?: string;
  position?: string;
  salary?: number;
  password?: string;
  department?: string;
  performance?: number;
  joinDate?: string;
  prevPassword?: any;
};

export interface loginInterface{
  email: string,
  password: string
}

export interface historyInterface  {
  id: number;
  empHistoryId: number;
  updatedOn: string;
  name?: {
    prevName: string;
    currentName: string;
  };
  salary?: {
    prevSalary: number;
    currentSalary: number;
  };
  age?: {
    prevAge: number;
    currentAge: number;
  };
  department?: {
    prevDpt: string;
    currentDpt: string;
  };
  position?: {
    prevPosition: string;
    currentPosition: string;
  };
  performance?: {
    prevPerformance:  number;
    currentPerformance:  number;
  };
  email?: {
    prevEmail: string;
    currentEmail: string;
  };
  password?: {
    prevpassword: any;
    currentpassword: any;
  };
};

export interface empHistoryInterface  {
  EmpId: any;
  updatedOn: any;
  name?: {
    prevName: string;
    newName: string;
  };
  age?: {
    prevAge: number;
    newAge: number;
  };
  email?: {
    prevEmail: string;
    newEmail: string;
  };
  position?: {
    prevPosition: string;
    newPosition: string;
  };
  salary?: {
    prevSalary: number;
    newSalary: number;
  };
  department?: {
    prevDepartment: string;
    newDepartment: string;
  };
  performance?: {
    prevPerformance:  number;
    newPerformance:  number;
  };
  password?: {
    prevpassword: any;
    newpassword: any;
  };
};