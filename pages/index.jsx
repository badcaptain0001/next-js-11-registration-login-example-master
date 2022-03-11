/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { userService } from "services";
import { Link } from "components";
import "../data/users.json";
import axios from "axios";

export default Home;
console.log(userService);
// get curreny time
const date = new Date();
const time = date.getHours();
const greeting = time < 12 ? "Good Morning" : "Good Afternoon";
console.log(greeting);
function Home() {
  const [users, setUsers] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [pushTask, setPushTask] = useState(null);
  const [issue, setIssue] = useState(null);
  const [showIssue, setShowIssue] = useState(false);

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
  }, []);
  // console.log(users[0].designation);
  function deleteUser(id) {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    userService.delete(id).then(() => {
      setUsers((users) => users.filter((x) => x.id !== id));
    });
  }
  const sentMsg = {
    tasks: pushTask,
  };
  const issueMsg = {
    name: userService.userValue?.firstName,
    issues: issue,
  };
  console.log(issueMsg);

  // for manager to intern
  useEffect(() => {
    axios.get("https://retoolapi.dev/EYONrL/data").then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, []);
  // for intern to manages

  const sendMsg = () => {
    axios.post("https://retoolapi.dev/EYONrL/data", sentMsg).then((res) => {
      console.log(res);
      if (res.status === 201) {
        console.log("success");
        setPushTask("");
      }
    });
  };
  const sendIssue = () => {
    axios.post("https://retoolapi.dev/aZsw2v/data", issueMsg).then((res) => {
      console.log(res);
      if (res.status === 201) {
        console.log("success");
        setIssue("");
      }
    });
  };
  // get message in case of manager
  useEffect(() => {
    axios.get("https://retoolapi.dev/aZsw2v/data").then((res) => {
      console.log(res.data);
      setShowIssue(res.data);
    });
  }, []);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  return (
    <div className="p-4">
      <div className="container">
        <h1>
          {greeting} {userService.userValue?.firstName}!{" "}
        </h1>
        <p>You&apos;re logged in as </p>
        <h1>{userService.userValue?.designation}</h1>
        <p>
          <Link href="/users">Manage Users</Link>
        </p>
        <div>
          {userService.userValue?.designation == "intern" ? (
            <div>
              <h1>Allocated Tasks for</h1>
              <p>{today}</p>
              <div className="allocatedTasks">
                {tasks &&
                  tasks.map((task, index) => {
                    return (
                      <div key={index}>
                        <li>{task.tasks}</li>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : null}
          {userService.userValue?.designation == "intern" ? null : (
            <div>
              <input
                type="text"
                value={pushTask}
                onChange={(e) => setPushTask(e.target.value)}
              />
              {pushTask}
              <button onClick={sendMsg}>send</button>
            </div>
          )}

          <h1>For Issues</h1>

          {userService.userValue?.designation == "manager" ? null : 
          
            <div>
              <input
                type="text"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
              />
              {issue}
              <button onClick={sendIssue}>send</button>
            </div>
          }
        </div>


        {userService.userValue?.designation == "manager" ? (
        <div>
        {showIssue && showIssue.map((issue, index) => {
          return (
            <div key={index}>
             <li>
             <span className="issueColor">{issue.name}--</span>{issue.issues}
              </li>
            </div>
          )
        }
        )}
        </div>
        ) : null}
    {/* write html below */}
    <p className="thisIsHome">hello</p>
      </div>
    </div>
  );
}
