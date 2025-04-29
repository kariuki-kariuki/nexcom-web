export enum JobState {
  Published = 'Published',
  Archived = 'Archive',
  Draft = 'Draft'
}
export interface JobInterface {
  title: string;
  description: string;
  status: JobState;
  requirements: string[];
  location: string;
  type: string;
  deadline: string;
  jd: string | null;
}

export interface JobDto extends JobInterface {
  id: number;
}
