export interface userTokenPayload {
  id: number;
  email: string;
}

export type FileNameCallback = (error: Error | null, filename: string) => void;
