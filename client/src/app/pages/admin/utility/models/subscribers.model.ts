export interface ISubscriber {
  userId: string;
  fullName: string;
  email: string;
  status: "ACTIVE" | "IN ACTIVE" | string;
}
