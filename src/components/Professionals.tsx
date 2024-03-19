import { getProfessionals } from "@tools/Api";
import {
  AreaContext,
  JobContext,
  JobListContext,
  SearchInputContext,
} from "@/App";
import Professional from "@/models/ProfessionalClass";
import { useContext, useEffect, useState } from "react";

// Class
export default function Professionals() {
  const [professionalList, setProfessionalList] = useState<Professional[]>([]);
  const { searchInput } = useContext(SearchInputContext);
  const { area } = useContext(AreaContext);
  const { job } = useContext(JobContext);
  const { jobList } = useContext(JobListContext);

  useEffect(() => {
    const fetchProfessionals = async () => {
      const professional = await getProfessionals();
      setProfessionalList(professional);
    };
    fetchProfessionals();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4 lg:grid-cols-2">
      {professionalList
        .filter((professional: Professional) => {
          const isName = professional.name.toLowerCase().includes(searchInput);
          const isArea = area.includes(professional.area);
          const isJob = job.includes(professional.job);
          const isJobDefault = job == "";
          return (
            (isName && isArea && isJob) || (isName && isArea && isJobDefault)
          );
        })
        .map((professional: Professional, index: number) => (
          <div
            className="card card-side bg-base-200 shadow-xl"
            key={index}>
            <figure>
              <img
                src={professional.img}
                alt={professional.img}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{professional.name}</h2>
              <p>{professional.email}</p>
              <p>{professional.area}</p>
              <p>{jobList.find((job) => job.id == professional.job)?.name}</p>
              <p>{professional.tel}</p>
              <p>{professional.des}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Contact</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
