import {
    Heading,
    BorderBox,
    Box,
    Flex,
    SideNav,
    Text, Flash, StyledOcticon
} from '@primer/components'
import Navbar from "../components/Navbar";
import TimeSlotRow from "../components/reservations/TimeSlotRow";
import {useEffect, useState} from "react";
import fb from "../lib/firebaseConfig";
import {format} from 'date-fns'
import ReservationDay from "../components/reservations/ReservationDay";
import {CheckIcon} from "@primer/octicons-react";


export default function Home() {
    const [reservationDays, setReservationDays] = useState([])
    const [selectedDay, setSelectedDay] = useState(null)

    /** Attach snapshot listener to reservationDay collection */
    useEffect(() => {
        fb.firestore().collection('reservationDay')
            .onSnapshot(snapshot => {
                setReservationDays(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
            })
    }, [])

    /** Set the default reservationDay to the first option if no day is already selected */
    useEffect(() => {
        if (selectedDay == null) {
            setSelectedDay(reservationDays[0])
        }
    }, [reservationDays])




    if (!selectedDay) return null

    return (
        <div>
            <Navbar/>
            <Box maxWidth={'52rem'} mx={'auto'} width={1} mt={4}>
                <Flash mb={4} variant="success">
                    <StyledOcticon icon={CheckIcon}/>
                    Booking successful! Please check your email for confirmation.
                </Flash>
                <Flex flexWrap="nowrap" flexShrink={0} alignItems={"flex-start"}>
                    <SideNav display={['none', null, 'block']} bordered maxWidth={160} width={1} aria-label="Main"
                             marginRight={4}>
                        {reservationDays.map(day => <SideNav.Link selected={selectedDay && (selectedDay.id == day.id)}
                                                                  key={day.id} onClick={() => setSelectedDay(day)}>
                            <Text>{format(day.date.toDate(), "eee M/d")}</Text>
                        </SideNav.Link>)}
                    </SideNav>

                    <ReservationDay reservationDay={selectedDay}/>
                </Flex>
            </Box>


        </div>
    )
}
