import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type Color = {
  backgroundColor: string
  textColor: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  color: Color
}

interface EventsStore {
  events: Array<Event>
  addEvent: (event: Event) => void
  removeEvent: (id: string) => void
  updateEvent: (id: string, event: Event) => void
  clearEvents: () => void
}

export const useEventsStore = create<EventsStore>()(
    persist(
        (set, get) => ({
            events: [],
            addEvent: (event) => {
              
                set(
                    (state) => ({
                        events: [...state.events, event]
                    })    
                )
            },
            removeEvent: (id) => {
                set(
                    (state) => ({
                        events: state.events.filter((event) => event.id !== id)
                    })    
                )
            },
            updateEvent: (id, ent) => {
                set(
                    (state) => ({
                        events: state.events.map((event) => {
                            if (event.id === id) {
                                return {
                                    ...event,
                                    ...ent
                                }
                            }
                            return event
                        })
                    })    
                )
            },
            clearEvents: () => {
                set(
                    (state) => ({
                        events: []
                    })    
                )
            }
        }),
        {
            name: 'main-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)
