// import { Employee, User, database } from "./db";

// interface Response {
//   status: number,
//   message: string
// }

// const getnerateUnique = ({ item = [], number = 10000 }: { item: any[], number: number }) => {
//   return number + item.length
// }

// export function createEmployee(payload: Employee): Response {
//   const { employees } = database;

//   try {
//     employees.push(
//       { ...payload, id: getnerateUnique({ item: employees, number: 10000 }).toString(), time: new Date() }
//     )
//     return {
//       status: 200,
//       message: "User created sucessfully"
//     }
//   } catch (error) {
//     return {
//       status: 501,
//       message: "Server Side Error"
//     }
//   }
// }

// export function createUser(payload: User): Response {
//   const { users } = database;
//   try {
//     users.push(
//       {
//         ...payload,
//         isActive: true,
//         time: new Date(),
//         accountNo: getnerateUnique({ item: users, number: 1000000 }).toString(),
//         transactions: [],
//         id: getnerateUnique({ item: users, number: 10000 }).toString()
//       }
//     )

//     console.log(users)
//     return {
//       status: 200,
//       message: "User created sucessfully"
//     }
//   } catch (error) {
//     return {
//       status: 501,
//       message: "Server Side Error"
//     }
//   }
// }

// export function getUsers() {
//   const { users } = database;
//   try {
//     return {
//       status: 200,
//       data: users
//     }
//   } catch (error) {
//     return {
//       status: 501,
//       message: "Server Side Error"
//     }
//   }
// }


// export function login({email, password}:{email: string, password: string}){
//   const { employees } = database;
//   const findData = employees.find(el => el.email == email && el.password == password);

//   if(findData){
//     return {
//       status: 200,
//       data: findData
//     }
//   }else {
//     return {
//       status: 200,
//       data: findData
//     }
//   }
// }



