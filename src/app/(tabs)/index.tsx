import { useEventsStore } from '../../store/useEventsStore';
import { Button, useTheme, Box, Text } from '@adaptui/react-native-tailwind';
import { FlatList } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

export default function TabOneScreen() {

  const tw = useTheme()

  const events = useEventsStore(state => state.events)
  const clearEvents = useEventsStore(state => state.clearEvents)
  const removeEvent = useEventsStore(state => state.removeEvent)


  console.log(events)

  return (
    <Box style={tw.style('flex-1 items-center justify-center')}>
      <Box style={tw.style('flex-1 w-full h-full')}>
        <FlatList
          data={events}
          contentContainerStyle={tw.style('flex-1 w-full h-full px-2 pt-2')}
          ItemSeparatorComponent={() => <Box style={tw.style('h-2')}></Box>}
          ListEmptyComponent={() => (
            <Box style={tw.style('flex-1 items-center justify-center')}>
              <Text style={tw.style('text-2xl font-bold')}>No Events</Text>
            </Box>
          )}
          renderItem={({ item }) => (
            <Button variant='outline' themeColor='base' onLongPress={() =>removeEvent(item.id)}>
              <Box style={tw.style('w-full p-2')}>
                <Text style={tw.style('text-xl font-bold')}>{item.title}</Text>
                <Text style={tw.style('text-lg font-semibold')}>{item.description}</Text>
                <Text>{item.date.toString()}</Text>
              </Box>
            </Button>
          )}
          // estimatedItemSize={100}
          keyExtractor={(item) => item.id}
        />
      </Box>

      <Box style={tw.style('flex-row justify-between items-center gap-2 p-2')}>
        <Box style={tw.style('flex-1')}>
          <Link href='/add-event' asChild>
            <Button variant='solid' size='xl' themeColor='primary' onPress={() => { }} >
              Add
            </Button>
          </Link>
        </Box>

        <Box style={tw.style('flex-1')}>
          <Button variant='solid' size='xl' themeColor='secondary' onPress={clearEvents} >
            Clear
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

