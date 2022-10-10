import { useRef, useState } from "react";
import Button from "../common/Button";
import Card from "../common/Card";
import ErrorModal from "../common/ErrorModal";
import classes from "./AddUser.module.css";

export default function AddUser(props) {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();
    const username = nameInputRef.current.value;
    const age = ageInputRef.current.value;

    if (username.trim().length === 0 || age.trim().length === 0) {
      setIsError(true);
      setErrorMessage("Please fill all the inputs");
      return;
    }
    if (+age < 1) {
      setIsError(true);
      setErrorMessage("Age is invalid");
      return;
    }
    props.onClick({ username, age });
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
    setIsError(false);
  };

  const closeModal = () => {
    setIsError(false);
  };
  return (
    <>
      {isError && (
        <ErrorModal
          title="An error occured!"
          message={errorMessage}
          closeModal={closeModal}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" ref={nameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input type="number" id="age" ref={ageInputRef} />
          <Button type="submit" onClick={addUserHandler}>
            Add User
          </Button>
        </form>
      </Card>
    </>
  );
}
