import { getProviders } from "@tools/Api";
import {
  AreaContext,
  JobContext,
  JobListContext,
  SearchInputContext,
} from "@/App";
import Provider from "@models/ProviderClass";
import { useContext, useEffect, useState } from "react";

// Class
export default function Providers() {
  const [providersList, setProvidersList] = useState<Provider[]>([]);
  const { searchInput } = useContext(SearchInputContext);
  const { area } = useContext(AreaContext);
  const { job } = useContext(JobContext);
  const { jobList } = useContext(JobListContext);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProvidersList(providers);
    };
    fetchProviders();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4 lg:grid-cols-2">
      {providersList
        .filter((provider: Provider) => {
          const isName = provider.name.toLowerCase().includes(searchInput);
          const isArea = area.includes(provider.area);
          const isJob = job.includes(provider.job);
          const isJobDefault = job == "";
          return (
            (isName && isArea && isJob) || (isName && isArea && isJobDefault)
          );
        })
        .map((provider: Provider, index: number) => (
          <div
            className="card card-side bg-base-200 shadow-xl"
            key={index}>
            <figure>
              <img
                src={provider.img}
                alt={provider.img}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{provider.name}</h2>
              <p>{provider.email}</p>
              <p>{provider.area}</p>
              <p>{jobList.find((job) => job.id == provider.job)?.name}</p>
              <p>{provider.tel}</p>
              <p>{provider.des}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Contact</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
