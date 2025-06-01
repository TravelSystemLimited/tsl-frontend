// stores/useFlightStore.ts
import { create } from 'zustand';

interface FlightStore {
  selectedDestination: string;
  setSelectedDestination: (destination: string) => void;
}

export const useFlightStore = create<FlightStore>((set) => ({
  selectedDestination: '',
  setSelectedDestination: (destination) => set({ selectedDestination: destination }),
}));