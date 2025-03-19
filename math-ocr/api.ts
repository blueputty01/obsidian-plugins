export type SimpleTexResponse = {
  status: boolean;
  res: {
    latex: string;
    conf: number;
  };
  request_id: string;
};
