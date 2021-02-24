import {Timestamp} from "@firebase/firestore-types";

interface ITimeSlot {
    start: Timestamp;
    end: Timestamp;
    maxReservations: number;
    reservationCount: number;
}

export default ITimeSlot