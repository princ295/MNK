import { AgGridReact } from "ag-grid-react";
import Modal from "../../components/Modal";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import Layout from "../Layout";
import Text from "../../components/Inputs/Text";
import { useSelector } from "react-redux";
import { User } from "../../redux/database/slice";
import { RootState } from "../../redux";
import { useState } from "react";

interface Transaction {
  form: string;
  to: string;
  type: string;
  date: string;
  ammount: number;
}

export interface Account {
  id: string;
  firstname: string;
  lastname: string;
  dob: string;
  address: string;
  isactive: boolean;
  ammount: number;
  tranzaction: Transaction[];
}

const AccountDetails = () => {

  const [openModel, setOpenModel] = useState<'history' | 'filter' | null>(null)
  const [currentTransaction, setCurrentTransaction] = useState<string | null>(null);

  const usersData: User[] = useSelector((state: RootState) => state.database.users);
  const [data, setData] = useState(usersData)

  const colDefs: ColDef[] = [
    {
      field: "accountNo",
      headerName: "Account Number",
    },
    {
      field: "name",
      headerName: "First Name",
    },
    {
      field: "lastName",
      headerName: "Last Name",
    },
    {
      field: "dob",
      headerName: "Date of Birth",
    },
    {
      field: "address",
      headerName: "Address",
    },
    {
      field: "ammount",
      headerName: "Amount",
    },
    {
      field: "",
      headerName: "Transaction History",
      cellRenderer: (param: ICellRendererParams) => {
        console.log(param, "param")

        return (
          <button
            onClick={() => {
              setOpenModel('history');
              setCurrentTransaction(param.data.accountNo);
              console.log(param);
            }}
            style={{ background: "transparent", border: "none", cursor: "pointer" }}
          >
            📜
          </button>)
      },
    },
  ];

  const transzactionCol: ColDef[] = [
    {
      field: "to",
      headerName: "To",
    },
    {
      field: "amount",
      headerName: "Amount",
      cellRenderer: (param: ICellRendererParams) => (
        <div style={{ color: param.data.type === 'credit' ? 'green' : 'red' }}>
          {param.data.type === 'credit' ? '+' : '-'}{param.data.amount}</div>
      ),
    },
    {
      field: "time",
      headerName: "Date",
    },
  ]

  function searchData(criteria: string) {
    console.log(criteria)
    if (criteria) {
      const _data = data.filter(item => (
        (item.name.toLowerCase().includes(criteria.toLowerCase())) ||
        (item.lastName.toLowerCase().includes(criteria.toLowerCase())) ||
        (item.ammount == (criteria as any)) ||
        (item.address.toLowerCase().includes(criteria.toLowerCase())) ||
        (item.id === criteria)
      ));
      setData(_data)
    } else {
      setData(usersData)
    }
  }


  const applyFilters = (payload: React.FormEvent<HTMLFormElement>) => {

    payload.preventDefault()

    const _data = new FormData(payload.currentTarget)


    const filteredUsers = data.filter(user => {

      if (user.time && user.time < new Date((_data.get('mindate') as string))) {
        return false;
      }
      if (user.time && user.time > new Date((_data.get('maxdate') as string))) {
        return false;
      }

      if (user.ammount && user.ammount < parseInt((_data.get('minammount') as string))) {
        return false;
      }
      if (user.ammount && user.ammount > parseInt((_data.get('maxammount') as string))) {
        return false;
      }

      return true; // Include in results if all filters pass
    });

    setData(filteredUsers);
  };



  return (
    <Layout>
      <br />
      <button title="Advance Filter" onClick={() => setOpenModel('filter')}>🔍</button>
      <Modal
        close={() => setOpenModel(null)}
        isvisible={openModel === 'filter'}
        title={`Filter`}
      >
        <form onSubmit={applyFilters}>
          <div className="col-two">
            <div>
              <label htmlFor="">Form</label>
              <Text placeholder="First Name" name="mindate" type="date" label="First Name" />
            </div>
            <div>
              <label htmlFor="">Form</label>
              <Text placeholder="First Name" name="maxdate" type="date" label="First Name" />
            </div>
          </div>

          <div className="col-two">
            <div>
              <label htmlFor="">Ammount Min</label>
              <Text placeholder="First Name" name="minammount" type="text" label="First Name" />
            </div>
            <div>
              <label htmlFor="">Ammount Max</label>
              <Text placeholder="First Name" name="maxammount" type="text" label="First Name" />
            </div>
          </div>

          <div className="modal__btn">
            <button type="submit" className="w-100 --submit">Search Details</button>
          </div>
        </form>
      </Modal>
      <Text onChnage={(e) => searchData(e.target.value)} label="" type="text" name="serch" placeholder="Serch account no, first,last name" />

      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          rowData={data}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
        />

        <Modal
          width={770}
          close={() => setOpenModel(null)}
          isvisible={openModel === 'history'}
          title={`Transaction History ${currentTransaction}`}
        >
          <div className="ag-theme-alpine" style={{ height: 300, width: "100%" }}>
            <AgGridReact
              rowData={usersData.find(el => el.accountNo == currentTransaction)?.transactions}
              columnDefs={transzactionCol}
            />
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default AccountDetails;

