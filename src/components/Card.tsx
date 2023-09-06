import { Box, Button, Text, useTheme } from "@adaptui/react-native-tailwind"
import { Event, useEventsStore } from "../store/useEventsStore"
import { router } from "expo-router"


interface CardProps {
  item: Event
}

export default function Card(props:CardProps) {

  const { item } = props

  const tw = useTheme()

  const removeEvent = useEventsStore(state => state.removeEvent)

  function goToEditEvent(id: string) {
    router.push(`/edit-event/${id}`)
  }

  function numberOfDaysUntil(date: string) {
    const today = new Date()
    const eventDate = new Date(date)
    const diffTime = Math.abs(eventDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
  }
  
  return (
    <Button variant='outline' themeColor='base' size="xl" onLongPress={() =>removeEvent(item.id)} onPress={() => goToEditEvent(item.id)} style={{
      backgroundColor: item.backgroundColor,
    }} >
      <Box style={tw.style('w-full py-2')}>
        <Text style={tw.style('text-xl font-bold')}>{item.title}</Text>
        <Text style={tw.style('text-lg font-semibold')}>{item.description}</Text>
        <Text style={tw.style('text-lg font-semibold')}>
          {numberOfDaysUntil(item.date)} days until {item.date}
        </Text>
      </Box>
    </Button>
  )
}