import { Box, Text, useTheme } from "@adaptui/react-native-tailwind";

export default function TabTwoScreen(){

  const tw = useTheme()

  return(
    <Box style={tw.style('flex-1 items-center p-2')}>
      <Text style={tw.style('text-xl font-bold')} >Remember Me</Text>
    </Box>
  )
}