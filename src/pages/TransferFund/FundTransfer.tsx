
import React, { useState } from "react"
import { AutoSuggestion } from "../../components/Inputs/AutoSuggation"
import Text from "../../components/Inputs/Text"
import Layout from "../Layout"
import { FormTranzaction, ToTranzaction, User, fundTransfer } from "../../redux/database/slice"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../redux"

interface FundTransfer {
  isvisible: boolean
  onClose: () => void
}

const FundTransfer: React.FC<FundTransfer> = () => {

  const [isMultiCurrrency, setisMultiCurrrency] = useState(false);
  const [result, setResult] = useState(null)

  const data: User[] = useSelector((state: RootState) => state.database.users);
  const dispatch = useAppDispatch();


  console.log(data, 'data')



  const [formData, setFormData] = useState({
    ammount: ''
  })


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const formData = new FormData(e.currentTarget)

    const payload: {
      form: FormTranzaction,
      to: ToTranzaction
    } = {
      form: {
        form: formData.get('form') as string,
        to: formData.get('to') as string,
        ammount: parseInt(formData.get('ammount') as string),
        status: 'debit',
        time: new Date()
      },
      to: {
        to: formData.get('to') as string,
        form: formData.get('form') as string,
        ammount: parseInt(formData.get('ammount') as string),
        status: 'debit',
        time: new Date()
      }
    }

    dispatch(
      fundTransfer(payload))

  }

  const formValue = () => { }

  const tovalue = () => {
  }


  const getCurrencyData = (form: any) => {
    if (!form)
      return

    var myHeaders = new Headers();
    myHeaders.append("apikey", "wLaGEzVLflqlVob27BJZEqOaojtUdOwK");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch(`https://api.apilayer.com/currency_data/convert?to=USD&from=${form}&amount=${formData["ammount"]}`,
      requestOptions)
      .then(response => response.json())
      .then(({ result }) => setResult(result))
      .catch(error => console.log('error', error));
  }

  const handleCheckbox = (e) => {
    setisMultiCurrrency(e.target.checked);
    getCurrencyData(e.target.checked)
  }



  const onChnage = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }))
  }

  const handleSelectCurrency = (e) => {

    console.log(e.target.value)
    getCurrencyData(e.target.value)
  }

  return (
    <Layout>
      <div style={{ width: 550, margin: '50px auto', padding: 10 }}>
        <fieldset style={{ padding: 15, borderRadius: 3 }}>
          <legend>Fund Teansfer</legend>
          <form autoComplete="off" onSubmit={onSubmit}>
            <div className="col-two">
              <AutoSuggestion name="form" data={data} callback={formValue} placeholder="From" />
              <AutoSuggestion name="to" data={data} callback={tovalue} placeholder="To" />
            </div>

            <Text onChnage={onChnage} placeholder="Enter Ammount" name="ammount" type="text" label="ammount" />

            <div className="col-two">
              Multi-Currency : <input type="checkbox" onChange={handleCheckbox} />
            </div>
            {
              isMultiCurrrency &&
              <div className="col-two">
                <select onChange={handleSelectCurrency} name="" id="">
                  <option value="">Select Currency From</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                </select>
                <div>
                  Ammount: {result && result}
                </div>
              </div>
            }

            <div>
            </div>
            <br />
            <div className="modal__btn">
              <button className="w-100 --submit">Transfer Fund</button>
            </div>
          </form>
        </fieldset>
      </div>
    </Layout>
  )
}

export default FundTransfer;