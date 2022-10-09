import { useState } from "react";
import Button from "../common/Button";
import Card from "../common/Card";
import ErrorModal from "../common/ErrorModal";
import classes from "./AddUser.module.css";

export default function AddUser(props) {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addUserHandler = (event) => {
    event.preventDefault();
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
    setIsError(false);
    clear();
  };

  const onChangeUsernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const onChangeAgeHandler = (event) => {
    setAge(event.target.value);
  };

  const clear = () => {
    setUsername("");
    setAge("");
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
          <input
            type="text"
            id="username"
            value={username}
            onChange={onChangeUsernameHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={onChangeAgeHandler}
          />
          <Button type="submit" onClick={addUserHandler}>
            Add User
          </Button>
        </form>
      </Card>
    </>
  );
}
