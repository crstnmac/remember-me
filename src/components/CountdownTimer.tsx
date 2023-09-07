import { Box, Text, useTheme } from '@adaptui/react-native-tailwind'
import React, { useEffect, useState } from 'react'
import { numberOfDaysUntil } from '../utils'

interface CountDownTimerProps {
  initialTime: any
  color: string
}

export default function CountDownTimer({ initialTime,color }: CountDownTimerProps) {

  const tw = useTheme()

  const initTime = new Date(initialTime).getTime()

  const [time, setTime] = useState(initTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1000; // Update the time correctly
        } else {
          clearInterval(interval);
          return 0; // Ensure the timer stops at 0
        }
      });
    }, 1000); // Update the timer every second

    return () => clearInterval(interval); // Clean up the interval on unmount
    
  }, []); // Removed 'time' from the dependency array

  // Format the time into DD:HH:MM:SS
  function formatTime(ms: number) {
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  // Function to get the time left
  function getTimeLeft() {
    return time;
  }
  
  return (
    <Box style={tw.style('py-2')}>
      <Text style={[tw.style('text-xl text-white-900 font-bold'),{
        color: color
      }]}>{
        numberOfDaysUntil(initialTime)} days {getTimeLeft() > 0 ? formatTime(getTimeLeft()) : 'Event Time'}
      </Text>
    </Box>
  )
}