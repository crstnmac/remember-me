import { useEventsStore } from '../../store/useEventsStore';
import { Button, useTheme, Box, Text } from '@adaptui/react-native-tailwind';
import { FlatList } from 'react-native-gesture-handler';
import { Link, router } from 'expo-router';
import Card from '../../components/Card';

export default function TabOneScreen() {

  const tw = useTheme()

  const events = useEventsStore(state => state.events)

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
              <Card item={item} />
          )}
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
      </Box>
    </Box>
  );
}

