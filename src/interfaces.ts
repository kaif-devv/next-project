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
