import { Box, Text, useTheme, Button } from "@adaptui/react-native-tailwind";
import { useEventsStore } from "../../store/useEventsStore";

export default function TabTwoScreen() {

  const tw = useTheme()
  const clearEvents = useEventsStore(state => state.clearEvents)

  return (
    <Box style={tw.style('flex-1 items-center p-2')}>
      <Text style={tw.style('text-xl font-bold')} >Remember Me</Text>

      <Box style={tw.style('flex-row justify-between items-center gap-2 p-2')}>
        <Box style={tw.style('flex-1')}>
          <Button variant='solid' size='xl' themeColor='primary' onPress={clearEvents} >
            Clear All Events
          </Button>
        </Box>
      </Box>
    </Box>
  )
}