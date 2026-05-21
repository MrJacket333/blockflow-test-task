export interface JobsQueueHandler {
  handleJob(jobId: string): Promise<void>;
}
