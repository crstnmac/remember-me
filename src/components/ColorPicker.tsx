
import React from 'react'
import { Box, Button, useTheme } from '@adaptui/react-native-tailwind'
import { Color } from '../store/useEventsStore'

interface ColorPickerProps {
  color:Color
  onChange: (color: Color) => void
}

export default function ColorPicker(props: ColorPickerProps) {
  const tw = useTheme()
  const { color, onChange } = props

  const [selectedColor, setSelectedColor] = React.useState<Color>(color)

  const colors = [
      {
        "backgroundColor": "#ffffff",
        "textColor": "#000000"
      },
      {
        "backgroundColor": "#005f73",
        "textColor": "#ffffff"
      },
      {
        "backgroundColor": "#0a9396",
        "textColor": "#ffffff"
      },
      {
        "backgroundColor": "#94d2bd",
        "textColor": "#000000"
      },
      {
        "backgroundColor": "#e9d8a6",
        "textColor": "#000000"
      },
      {
        "backgroundColor": "#ee9b00",
        "textColor": "#ffffff"
      },
      {
        "backgroundColor": "#ca6702",
        "textColor": "#ffffff"
      },
      {
        "backgroundColor": "#bb3e03",
        "textColor": "#ffffff"
      },
      {
        "backgroundColor": "#ae2012",
        "textColor": "#ffffff"
      },
      {
        "backgroundColor": "#9b2226",
        "textColor": "#ffffff"
      }
    ]


  return (
    <Box style={tw.style('flex-row  flex-wrap gap-2')}>
      {
        colors.map((color, index) => (
          <Button key={index} style={tw.style('w-10 h-10 rounded-full')} onPress={() => {
            setSelectedColor({
              backgroundColor: color.backgroundColor,
              textColor: color.textColor
            })
            onChange({
              backgroundColor: color.backgroundColor,
              textColor: color.textColor
            })
          }}>
            <Box style={[tw.style('w-10 h-10 rounded-full', selectedColor.backgroundColor === color.backgroundColor ? 'border-2' : ''),{
              backgroundColor: color.backgroundColor
            }]}></Box>
          </Button>
        ))
      }
    </Box>
  )
}