import React, { useState } from 'react';
import { Box, useTheme, Input, Touchable, Button, Icon } from '@adaptui/react-native-tailwind';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Alert, Platform } from 'react-native';
import { Color, useEventsStore } from '../../store/useEventsStore';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import ColorPicker from '../../components/ColorPicker';
import Feather from '@expo/vector-icons/Feather';


export default function EditEventModal() {

  const { id } = useLocalSearchParams()

  const events = useEventsStore(state => state.events)

  const event = events.find(event => event.id === id)

  const tw = useTheme()

  const updateEvent = useEventsStore(state => state.updateEvent)
  const deleteEvent = useEventsStore(state => state.removeEvent)

  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const [title, setTitle] = useState(event?.title)
  const [description, setDescription] = useState(event?.description)
  const [eventDate, setEventDate] = useState(event?.date)
  const [color, setColor] = useState<Color>({
    backgroundColor: event?.color?.backgroundColor || '#ffffff',
    textColor: event?.color?.textColor || '#000000'
  })

  function togglePicker() {
    setShowPicker(!showPicker)
  }

  function onDateChange({ type }: {
    type: any
  }, selectedDate: Date | undefined) {
    if (type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        togglePicker()
        setEventDate(currentDate.toDateString())
      }
    } else {
      togglePicker()
    }
  }

  function iosConfirmDate() {
    setEventDate(date.toDateString())
    togglePicker()
  }

  function update() {
    updateEvent(id as string, {
      id: id as string,
      title: title || '',
      description: description || '',
      date: eventDate || '',
      color: color
    })
    router.back()
  }


  return (
    <Box style={tw.style('flex-1')}>
    <Stack.Screen options={{
                title: 'Edit Event',
                presentation: 'modal',
                headerRight: () => (
                  <Button
                  
                  variant='solid'
                  themeColor='danger'
                  onPress={() => {
                    Alert.alert(
                      'Delete Event',
                      'Are you sure you want to delete this event?',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },{
                          text: 'Delete',
                          style: 'destructive',
                          onPress: () => {
                            deleteEvent(id as string)
                            router.back()
                          }
                        }
                      ]
                    )
                   }}>
                    
                    <Feather name='trash-2' color="#ffff" size={20} />

                  </Button>
                  
                )
                    }}
                />

      
      <Box style={tw.style('flex-1 items-center justify-center')}>
        <Box style={tw.style('flex-1 w-full h-full')}>
          <Box style={tw.style('w-full p-2')}>
            <Input placeholder='Title' value={title} size='xl' onChangeText={setTitle} />
          </Box>
          <Box style={tw.style('w-full p-2')}>
            <Input placeholder='Description' value={description} size='xl' onChangeText={setDescription} />
          </Box>
          <Box style={tw.style('w-full p-2')}>
            {!showPicker && (<Touchable onPress={togglePicker}>
              <Input placeholder='Select Date' size='xl' value={eventDate} editable={false} onPressIn={togglePicker} />
            </Touchable>)}
            {showPicker && (
              <DateTimePicker
                mode='datetime'
                value={date}
                display='spinner'
                onChange={onDateChange}
                style={tw.style('w-full h-64 -mt-2.5 rounded-lg')}
              />
            )}
            {
              showPicker && Platform.OS === 'ios' && (
                <Box style={tw.style('flex-row justify-between items-center p-2 gap-2 ')}>
                  <Box style={tw.style('flex-1')}>
                    <Button variant='outline' size='lg' themeColor='base' onPress={togglePicker}>
                      Cancel
                    </Button>
                  </Box>
                  <Box style={tw.style('flex-1')}>
                    <Button variant='outline' size='lg' themeColor='primary' onPress={iosConfirmDate}>
                      Done
                    </Button>
                  </Box>
                </Box>
              )
            }
          </Box>
          <Box style={tw.style('w-full p-2')}>
            <ColorPicker color={color} onChange={setColor} />
          </Box>
          <Box style={tw.style('flex-row justify-between items-center p-2 gap-2')}>
            <Box style={tw.style('flex-1')}>
              <Button variant='outline' size='xl' themeColor='base' onPress={() => router.back()}>
                Cancel
              </Button>
            </Box>
            <Box style={tw.style('flex-1')}>
              <Button variant='solid' size='xl' themeColor='success' onPress={update}>
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}