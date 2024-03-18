import { JobListContext } from "@/App";
import User from "@/models/UserClass";
import { enableUser, getUsers } from "@/tools/Api";
import { useContext, useEffect, useState } from "react";

function Table() {
  const [users, setUsers] = useState<User[]>([]);
  const { jobList } = useContext(JobListContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const handleCheckBox = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.target.disabled = true;
    const currentCheckStatus = e.target.checked;
    try {
      enableUser(id, currentCheckStatus);
      e.target.checked = currentCheckStatus;
    } catch (error) {
      e.target.checked = !currentCheckStatus;
    }
    e.target.disabled = false;
  };

  return (
    <div className="overflow-x-auto p-8">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                />
              </label>
            </th>
            <th>Name</th>
            <th>Job</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    defaultChecked={user.enabled}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleCheckBox(user.id, e);
                    }}
                  />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={user.img}
                        alt=""
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.name}</div>
                    <div className="text-sm opacity-50">{user.area}</div>
                  </div>
                </div>
              </td>
              <td>
                {user.email}
                <br />
                <span className="badge badge-ghost badge-sm">
                  {jobList.find((job) => job.id === user.job)?.name}
                </span>
              </td>
              <td>{user.tel}</td>
              <th>
                <button className="btn btn-secondary">Delete</button>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Table;
