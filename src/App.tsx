import { createContext, useEffect, useState } from "react";
import { getJobs } from "@tools/Api";
import Job from "@models/JobClass";
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./views/HomePage";
import AdminPage from "./views/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "admin",
    element: <AdminPage />,
  },
  {
    path: "/*",
    element: <HomePage />,
  },
]);

// Context Global
export const SearchInputContext = createContext<{
  searchInput: string;
  setSearchInput: (value: string) => void;
}>({
  searchInput: "",
  setSearchInput: () => null,
});

export const AreaContext = createContext<{
  area: string[];
  setArea: (value: string[]) => void;
}>({
  area: [],
  setArea: () => null,
});

export const JobContext = createContext<{
  job: string;
  setJob: (value: string) => void;
}>({
  job: "",
  setJob: () => null,
});

export const JobListContext = createContext<{
  jobList: Job[];
  setJobList: (value: Job[]) => void;
}>({
  jobList: [],
  setJobList: () => null,
});

export const ToastMessageContext = createContext<{
  toastMessage: string;
  setToastMessage: (value: string) => void;
}>({
  toastMessage: "",
  setToastMessage: () => null,
});

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [area, setArea] = useState<string[]>(["Nord", "Sud", "Est", "Ouest"]);
  const [job, setJob] = useState("");
  const [jobList, setJobList] = useState<Job[]>([]);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      const jobs = await getJobs();
      setJobList(jobs);
    };
    fetchJobs();
  }, []);

  return (
    <div className=" min-h-[100vh] flex flex-col justify-between">
      <ToastMessageContext.Provider value={{ toastMessage, setToastMessage }}>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <AreaContext.Provider value={{ area, setArea }}>
            <JobContext.Provider value={{ job, setJob }}>
              <JobListContext.Provider value={{ jobList, setJobList }}>
                <SearchInputContext.Provider
                  value={{
                    searchInput,
                    setSearchInput,
                  }}>
                  <RouterProvider router={router} />
                </SearchInputContext.Provider>
              </JobListContext.Provider>
            </JobContext.Provider>
          </AreaContext.Provider>
        </CookiesProvider>
      </ToastMessageContext.Provider>
    </div>
  );
}
