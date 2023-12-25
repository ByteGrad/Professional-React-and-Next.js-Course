export type SortBy = "relevant" | "recent";

export type JobItem = {
  id: number;
  title: string;
  badgeLetters: string;
  company: string;
  relevanceScore: number;
  daysAgo: number;
  coverImgURL: string;
  companyURL: string;
  duration: string;
  salary: string;
  location: string;
  description: string;
  qualifications: string[];
  reviews: string[];
};

export type JobItemExpanded = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  location: string;
  salary: string;
  duration: string;
};

export type JobItemId = JobItem["id"];
