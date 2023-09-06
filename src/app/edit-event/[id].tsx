import React, { useState } from 'react';
import { Box, useTheme, Input, Touchable, Button } from '@adaptui/react-native-tailwind';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform } from 'react-native';
import { useEventsStore } from '../../store/useEventsStore';
import { router, useLocalSearchParams } from 'expo-router';
import ColorPicker from '../../components/ColorPicker';


export default function EditEventModal() {

  const { id } = useLocalSearchParams()

  const events = useEventsStore(state => state.events)

  const event = events.find(event => event.id === id)

  const tw = useTheme()

  const updateEvent = useEventsStore(state => state.updateEvent)

  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const [title, setTitle] = useState(event?.title)
  const [description, setDescription] = useState(event?.description)
  const [eventDate, setEventDate] = useState(event?.date)
  const [backgroundColor, setBackgroundColor] = useState(event?.backgroundColor || '#ffffff')

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
      backgroundColor: backgroundColor
    })
    router.back()
  }

  return (
    <Box style={tw.style('flex-1')}>
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
            <ColorPicker color={backgroundColor} onChange={setBackgroundColor} />
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