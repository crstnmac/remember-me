
import React from 'react'
import { Box, Button, useTheme } from '@adaptui/react-native-tailwind'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export default function ColorPicker(props: ColorPickerProps) {
  const tw = useTheme()
  const { color, onChange } = props

  const [selectedColor, setSelectedColor] = React.useState(color)

  const colors = ["#ffffff", "#005f73", "#0a9396", "#94d2bd", "#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226"]


  return (
    <Box style={tw.style('flex-row  flex-wrap gap-2')}>
      {
        colors.map((color, index) => (
          <Button key={index} style={tw.style('w-10 h-10 rounded-full')} onPress={() => {
            setSelectedColor(color)
            onChange(color)
          }}>
            <Box style={tw.style(`w-10 h-10 rounded-full ${color === selectedColor ? 'border-2 border-white-900' : ''}`)} backgroundColor={color} />
          </Button>
        ))
      }
    </Box>
  )
}