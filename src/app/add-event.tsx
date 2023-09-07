import React, { useState } from 'react';
import { Box, useTheme, Input, Touchable, Button } from '@adaptui/react-native-tailwind';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform } from 'react-native';
import { Color, useEventsStore } from '../store/useEventsStore';
import { router } from 'expo-router';
import * as Crypto from 'expo-crypto'
import ColorPicker from '../components/ColorPicker';

export default function AddEventModal() {

  const tw = useTheme()

  const add = useEventsStore(state => state.addEvent)

  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [color, setColor] = useState<Color>({
    backgroundColor: '#ffffff',
    textColor: '#000000'
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
        setEventDate(currentDate.toISOString())
      }
    } else {
      togglePicker()
    }
  }

  function iosConfirmDate() {
    setEventDate(date.toISOString())
    togglePicker()
  }

  function addEvent() {
    add({
      id: Crypto.randomUUID(),
      title: title,
      description: description,
      date: eventDate,
      color: color
    })
    router.back()
  }

  return (
    <Box style={tw.style('flex-1')}>
      <Box style={tw.style('flex-1 items-center justify-center')}>
        <Box style={tw.style('flex-1 w-full h-full')}>
          <Box style={tw.style('w-full p-2')}>
            <Input placeholder='Title' value='' size='xl' onChangeText={setTitle} />
          </Box>
          <Box style={tw.style('w-full p-2')}>
            <Input placeholder='Description' value='' size='xl' onChangeText={setDescription} />
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

            <Box style={tw.style('w-full pt-4')}>
              <ColorPicker color={color} onChange={setColor} />
            </Box>
            <Box style={tw.style('flex-row justify-between items-center py-4 gap-2')}>
              <Box style={tw.style('flex-1')}>
                <Button variant='outline' size='xl' themeColor='base' onPress={() => router.back()}>
                  Cancel
                </Button>
              </Box>
              <Box style={tw.style('flex-1')}>
                <Button variant='solid' size='xl' themeColor='primary' onPress={addEvent}>
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}