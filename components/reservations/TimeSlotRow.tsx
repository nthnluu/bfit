import {Box, Button, ButtonDanger, Flex, Label, Text} from "@primer/components";
import {FC} from "react";
import ITimeSlot from "../../lib/types/ITimeSlot";
import {format} from "date-fns";
import {Timestamp} from "@firebase/firestore-types";


interface Props {
    slot: ITimeSlot;
    reserved: boolean;
}

const TimeSlotRow: FC<Props> = ({slot, reserved}) => {

    /** Formats a time stamp into H:MM PM format */
    function formatTime(timestamp: Timestamp): String {
        return format(timestamp.toDate(), "h:mm a")
    }

    /** Total number available slots */
    const availableSlots = slot.maxReservations - slot.reservationCount

    return <Box>
        <Flex alignItems="center" justifyContent="space-between">
            <Flex flexDirection="column">
                <Text fontWeight={600}>
                    {formatTime(slot.start)} - {formatTime(slot.end)}
                </Text>
                <Box>
                    {reserved ? <Label variant="medium" bg="#2EA44E">Reserved</Label> :
                        <Text fontSize={1} color={availableSlots == 0 && "red.6"}>
                            {availableSlots} available spot{availableSlots != 1 && 's'}
                        </Text>}
                </Box>
            </Flex>

            {reserved ? <ButtonDanger>Cancel Reservation</ButtonDanger> :
                <Button disabled={availableSlots < 1}>{availableSlots > 0 ? "Reserve" : "Unavailable"}</Button>}
        </Flex>
    </Box>

}

export default TimeSlotRow