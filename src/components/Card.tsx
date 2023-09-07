import { Box, Button, Text, useTheme } from "@adaptui/react-native-tailwind"
import { Event, useEventsStore } from "../store/useEventsStore"
import { router } from "expo-router"
import CountDownTimer from "./CountdownTimer"

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
  
  return (
    <Button variant='outline' themeColor='base' size="xl" onLongPress={() =>removeEvent(item.id)} onPress={() => goToEditEvent(item.id)} style={{
      backgroundColor: item?.color?.backgroundColor,
    }} >
      <Box style={tw.style('w-full py-2')}>
        <Text style={[tw.style('text-xl font-bold'),{
          color: item?.color?.textColor
        }]}>{item.title}</Text>
        <Text style={[tw.style('text-lg font-semibold'),{
          color: item?.color?.textColor
        }]}>{item.description}</Text>
        <CountDownTimer color={
          item?.color?.textColor
        }  initialTime={item.date} />
      </Box>
    </Button>
  )
}