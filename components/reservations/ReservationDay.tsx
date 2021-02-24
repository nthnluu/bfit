import {FC, useEffect, useState} from "react";
import {BorderBox, Box, Heading, Text} from "@primer/components";
import {format} from "date-fns";
import TimeSlotRow from "./TimeSlotRow";
import fb from "../../lib/firebaseConfig";
import IReservationDay from "../../lib/types/IReservationDay";

interface Props {
    reservationDay: IReservationDay
}

const ReservationDay: FC<Props> = ({reservationDay}) => {
    const [slots, setSlots] = useState([])

    /** Fetches time slots for the given reservationDay */
    useEffect(() => {
        fb.firestore().collection('reservationDay').doc(reservationDay.id).collection('slots').orderBy('start')
            .onSnapshot(snapshot => {
                setSlots(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
            })
    }, [reservationDay])

    return <BorderBox width="100%" p={3}>
        <Heading fontSize={4} mb={3}>{format(reservationDay.date.toDate(), "eeee M/d")}</Heading>
        <Box sx={{
            '> *': {
                borderWidth: 0,
                borderColor: 'border.gray',
                borderStyle: 'solid',
                borderTopWidth: 1,
                paddingTop: 3,
                paddingBottom: 3,
                ':last-child': {
                    borderBottomWidth: 0,
                    paddingBottom: 0
                }
            }
        }}>
            {/*Displays time slots*/}
            {slots.map((slot, index) => <TimeSlotRow reserved={index%2 == 0} key={slot.id} slot={slot}/>)}

            {/*Displays a message if no time slots were found */}
            {slots.length < 1 && <Box width={1}>
                <Text>There aren't any available slots on this day.</Text>
            </Box>}
        </Box>
    </BorderBox>
}

export default ReservationDay