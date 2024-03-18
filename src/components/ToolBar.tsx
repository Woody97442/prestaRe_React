import {
  AreaContext,
  JobContext,
  JobListContext,
  SearchInputContext,
} from "@/App";
import { useContext } from "react";

export default function ToolBar() {
  const areaLabel = ["Nord", "Sud", "Est", "Ouest"];

  const { setSearchInput } = useContext(SearchInputContext);
  const { area, setArea } = useContext(AreaContext);
  const { setJob } = useContext(JobContext);
  const { jobList } = useContext(JobListContext);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <ul className="menu menu-horizontal px-1">
          {areaLabel.map((item: string, index: number) => (
            <li key={index}>
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <span className="label-text">{item} </span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox"
                    value={item}
                    onInput={(e) => {
                      if (e.currentTarget.checked) {
                        setArea([...area, e.currentTarget.value]);
                      } else {
                        setArea(
                          area.filter(
                            (value) => value !== e.currentTarget.value
                          )
                        );
                      }
                    }}
                  />
                </label>
              </div>
            </li>
          ))}
        </ul>
        <select
          className="select select-bordered w-full max-w-xs"
          onInput={(e) => {
            setJob(e.currentTarget.value);
          }}
          defaultValue={""}>
          <option
            defaultChecked
            value={""}>
            default
          </option>
          {jobList.map((job) => (
            <option
              key={job.id}
              value={job.id}>
              {job.name}
            </option>
          ))}
        </select>
      </div>
      <div className="navbar-end">
        <div className="form-control flex flex-row gap-2">
          <input
            type="text"
            placeholder="Search ..."
            className="input input-bordered w-24 md:w-auto"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
