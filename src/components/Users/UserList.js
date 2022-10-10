import classes from "./UserList.module.css";
import Card from "../common/Card";
export default function UserList(props) {
  return (
    <Card className={classes.users}>
      <ul>
        {props.users.map((user) => (
          <li
            key={Math.random().toString()}
          >{`${user.username} - ${user.age}`}</li>
        ))}
      </ul>
    </Card>
  );
}
