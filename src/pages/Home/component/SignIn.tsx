import React from "react";
import Modal from "../../../components/Modal";
import Text from "../../../components/Inputs/Text";
import { useAppDispatch } from "../../../redux";
import { login } from "../../../redux/database/slice";

interface SignInProps {
  isvisible: boolean
  onClose: () => void
}

const SignIn: React.FC<SignInProps> = ({ onClose, isvisible }) => {

  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    dispatch(login(data as any))
    onClose()
  }

  const onReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.currentTarget.reset()
  }

  return (
    <Modal isvisible={isvisible} title="Sign In" close={onClose}>
      <form onReset={onReset} autoComplete="off" onSubmit={onSubmit}>
        <Text placeholder="Enter Email" name="email" type="email" label="Email" />
        <Text placeholder="Enter Password" name="password" type="password" label="Password" />
        <div className="modal__btn">
          <a href="#">Sign In</a>
          <div>
            <button type="submit" className="--submit-sm">Sign In</button>
            <button className="--submit-sm">Reset</button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default SignIn;