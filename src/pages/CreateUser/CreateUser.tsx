import React from "react";
import Modal from "../../components/Modal";
import Text from "../../components/Inputs/Text";
import TextArea from "../../components/Inputs/TextArea";
import { User, createUser } from "../../redux/database/slice";
import { useAppDispatch } from "../../redux";

export interface IUser {
  firstname: string
  lastname: string
  dob: Date
  address: string
  ammount: number,
  isactive: boolean
}

interface CreateUserProps {
  isvisible: boolean
  onClose: () => void
}

const CreateUser: React.FC<CreateUserProps> = ({ onClose, isvisible }) => {

  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    const formData = new FormData(e.currentTarget);
    type IUser = Omit<User, 'accountNo'>

    const _payload: IUser = {
      name: formData.get('name') as string,
      lastName: formData.get('lastName') as string,
      address: formData.get('address') as string,
      ammount: parseInt(formData.get('amount') as string),
      isActive: true,
      transactions: [],
      dob: new Date(formData.get('dob') as string),
    }
    dispatch(createUser(_payload))
    e.currentTarget.reset()

    alert('account create sucessfully');
    onClose()

  }


  return (
    <Modal isvisible={isvisible} title="Create User" close={onClose}>

      <div className="modal__body">
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="col-two">
            <Text placeholder="First Name" name="name" type="text" label="First Name" />
            <Text placeholder="Last Name" name="lastName" type="text" label="Last Name" />
          </div>

          <div className="col-two">
            <Text placeholder="" name="dob" type="date" label="Date of Brith" />
            <Text placeholder="Enter Ammount" name="amount" type="text" label="Enter Ammount" />
          </div>

          <TextArea placeholder="Enter Address" name="address"
            label="Enter Address" />

          <div className="modal__btn">
            <button type="submit" className="w-100 --submit">Create User</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default CreateUser;