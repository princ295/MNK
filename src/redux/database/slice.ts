import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Employee {
  id: string;  // Make id required since it's used as a unique identifier
  name: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  time?: Date;
}

interface Login {
  email: string, password: string
}

export interface Transaction {
  from: string;
  to: string;
  time: Date;
  type: 'credit' | 'debit';
  amount: string | number;
}

export interface User {
  id?: string;
  name: string;
  lastName: string;
  accountNo: string;
  dob: Date;
  ammount: number;
  address: string;
  isActive: boolean;
  time?: Date;
  transactions: Transaction[];
}

export interface IDatabase {
  employees: Employee[];
  users: User[];
  isauth: boolean
}

export type TStatus = 'debit' | 'create'

export interface FormTranzaction {
  to: string
  form: string
  ammount: number,
  status: TStatus
  time: Date
}

export interface ToTranzaction {
  to: string
  form: string
  ammount: number,
  status: TStatus,
  time: Date
}

const initialState: IDatabase = {
  employees: [
    {
      "id": "10000",
      "name": "Prince",
      "lastName": "Dewangan",
      "email": "prince@gmail.com",
      "password": "12345",
      "time": new Date("2024-07-04T16:00:08.843Z")
    }
  ],
  users: [
    {
      "name": "Omi",
      "lastName": "Dev",
      "address": "Hydrabad",
      "ammount": 100000,
      "isActive": true,
      "dob": new Date("2024-07-01T00:00:00.000Z"),
      "id": "10001",
      "time": new Date("2024-07-04T16:23:52.389Z"),
      "accountNo": "10000101",
      "transactions": [
        {
          "to": "10000102",
          "time": new Date("2024-07-04T17:34:32.633Z"),
          "type": "debit",
          "amount": 12000,
          "from": "10000101"
        }
      ],
    },
    {
      "name": "Sumit",
      "lastName": "Hari",
      "address": "Banglore",
      "ammount": 100000,
      "isActive": true,
      "transactions": [
        {
          "to": "10000103",
          "time": new Date("2024-07-04T17:36:48.353Z"),
          "type": "debit",
          "amount": 1200,
          "from": "10000102"
        }
      ],
      "dob": new Date("2024-07-01T00:00:00.000Z"),
      "id": "10002",
      "time": new Date("2024-07-04T16:23:52.389Z"),
      "accountNo": "10000102"
    },
    {
      "name": "Summy",
      "lastName": "Pathan",
      "address": "Jammu",
      "ammount": 11200,
      "isActive": true,
      "transactions": [
        {
          "to": "10000102",
          "time": new Date("2024-07-04T17:36:48.353Z"),
          "type": "debit",
          "amount": 1200,
          "from": "10000103"
        }
      ],
      "dob": new Date("2024-07-01T00:00:00.000Z"),
      "id": "10003",
      "time": new Date("2024-07-04T16:23:52.389Z"),
      "accountNo": "10000103"
    }, {
      "name": "Roshan",
      "lastName": "Sharma",
      "address": "Delhi",
      "ammount": 100000,
      "isActive": true,
      "transactions": [],
      "dob": new Date("2024-07-01T00:00:00.000Z"),
      "id": "10004",
      "time": new Date("2024-07-04T16:23:52.389Z"),
      "accountNo": "10000104"
    },
    {
      "name": "Chetan",
      "lastName": "Patil",
      "address": "Banglore",
      "ammount": 100000,
      "isActive": true,
      "transactions": [],
      "dob": new Date("2024-07-01T00:00:00.000Z"),
      "id": "10005",
      "time": new Date("2024-07-04T16:23:52.389Z"),
      "accountNo": "10000105"
    }
  ],
  isauth: false
};

// Function to generate a unique ID
const generateUniqueId = (items: any[], number: number): string => {
  return (number + items.length).toString();
};

const databaseSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    createEmployee: (state, action: PayloadAction<Omit<Employee, 'id'>>) => {
      const { employees } = state;
      const nextId = generateUniqueId(employees, 10000);
      const newEmployee: Employee = {
        ...action.payload,
        id: nextId,
        time: new Date() as Date,
      };
      employees.push(newEmployee)
      state.employees = [...employees]

      console.log(state.employees)
      alert('Employee create Sucessfully')
    },
    createUser: (state, action: PayloadAction<Omit<User, 'accountNo'>>) => {

      console.log(action, 'action')
      const { users } = state;
      const nextId = generateUniqueId(users, 10000);
      const newEmployee: User = {
        ...action.payload,
        id: nextId,
        time: new Date(),
        accountNo: generateUniqueId(users, 10000100),
      };
      users.push(newEmployee);
      state.users = [...users]


      console.log(state.users, 'data')
      alert('Employee create Sucessfully')
    },
    login: (state, action: PayloadAction<Login>) => {
      const { employees } = state;

      const { email, password } = action.payload
      const findUser = employees.find(el => el.email == email && el.password == password);
      console.log(employees, findUser)
      if (findUser) {
        alert("Login Sucessfull");
        state.isauth = true
      } else {
        alert("Login Fail");
      }
    },
    fundTransfer: (state, action: PayloadAction<{
      form: FormTranzaction,
      to: ToTranzaction
    }>) => {
      const { users } = state;

      const { form, to } = action.payload;
      users.forEach(el => {
        if (el.accountNo == form.form) {
          el.ammount = el.ammount - form.ammount;
          el.transactions.push({
            to: form.to,
            time: form.time,
            type: 'debit',
            amount: form.ammount,
            from: el.accountNo
          })
        }
        if (el.accountNo == to.to) {
          el.ammount = el.ammount + form.ammount;
          el.transactions.push({
            to: el.accountNo,
            time: form.time,
            type: 'credit',
            amount: form.ammount,
            from: to.form
          })
        }
      })
      state.users = [...users]
      console.log(state.users);
      alert('Tranzaction Complte Sucessfuly')
    },
  },
});

export const { createEmployee, login, createUser, fundTransfer } = databaseSlice.actions;

export default databaseSlice.reducer;