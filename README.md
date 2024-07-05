# React + TypeScript + Vite

# Run Project 
npm run dev

# Data Mangement 

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

employees - admin User in banking System

users - customer

# Note
Entire data Here managing by redux it loass after reloading above data is persist