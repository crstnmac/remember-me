import { Box, Button, Text, useTheme } from '@adaptui/react-native-tailwind';
import React, { useState } from 'react'

export default function Time() {

  const tw = useTheme()

  const [time, setTime] = useState<string>();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  },[])

  return (
    <Box style={tw.style('p-2')}>
      <Text style={tw.style('text-2xl font-bold')}>
        {time}
      </Text>
    </Box>
  )
}
