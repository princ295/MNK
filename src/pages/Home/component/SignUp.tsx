import React from "react";
import Modal from "../../../components/Modal";
import Text from "../../../components/Inputs/Text";
import { useAppDispatch } from "../../../redux";
import { Employee } from "../../../redux/database/slice";

interface SignUpProps {
  isvisible: boolean
  onClose: () => void
}

const SignUp: React.FC<SignUpProps> = ({ onClose, isvisible }) => {

  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget); 
    const payload: Employee = {
      id: formData.get('id') as string,
      name: formData.get('name') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    onClose()
  }

  const onReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.currentTarget.reset()
  }

  return (
    <Modal isvisible={isvisible} title="Sign Up" close={onClose}>
      <div className="modal__body">
        <form onReset={onReset} onSubmit={onSubmit} autoComplete="off">
          <div className="col-two">
            <Text placeholder="First Name" name="name" type="text" label="First Name" />
            <Text placeholder="Last Name" name="lastName" type="text" label="Last Name" />
          </div>
          <Text placeholder="Enter Email" name="email" type="email" label="Email" />
          <Text placeholder="Enter Password" name="password" type="password" label="Password" />
          <Text placeholder="Re-Enter Password" name="cpassword" type="password" label="Conform Password" />
          <div className="modal__btn">
            <a href="#">Sign In</a>
            <div>
              <button type="submit" className="--submit-sm">Login</button>
              <button type="reset" className="--submit-sm">Reset</button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default SignUp;