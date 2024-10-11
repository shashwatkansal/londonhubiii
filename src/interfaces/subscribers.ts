import { Timestamp } from "firebase/firestore";

interface Subscriber {
  email: string;
  timestamp: Timestamp;
}
