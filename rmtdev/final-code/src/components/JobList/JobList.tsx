import { useActiveIdContext } from "../../contexts/ActiveIdContextProvider";
import { JobItem } from "../../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "../Spinner";

type JobListProps = {
  jobItems: JobItem[];
  isLoading?: boolean;
};

const JobList = ({ jobItems, isLoading = false }: JobListProps) => {
  const { activeJobItemId } = useActiveIdContext();

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}

      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            {...jobItem}
            isActive={jobItem.id === activeJobItemId}
          />
        ))}
    </ul>
  );
};

export default JobList;
