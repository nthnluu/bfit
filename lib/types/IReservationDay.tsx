import {Timestamp} from "@firebase/firestore-types";

interface IReservationDay {
    id: string;
    date: Timestamp;
    facility: string;
}

export default IReservationDay