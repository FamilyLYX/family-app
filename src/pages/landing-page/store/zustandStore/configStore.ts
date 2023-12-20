import { create } from "zustand";

interface iModelStore {
  isModelOpen: boolean;
  setModelOpen: (isOpen: boolean) => void;
}

interface iHoveredChip {
  isChipHovered: boolean;
  setChipHovered: (isHovered: boolean) => void;
}

export const useModelStore = create<iModelStore>((set) => ({
  isModelOpen: false,
  setModelOpen: (isOpen: boolean) => set({ isModelOpen: isOpen }),
}));

export const useHoveredChip = create<iHoveredChip>((set) => ({
  isChipHovered: false,
  setChipHovered: (isHovered: boolean) => set({ isChipHovered: isHovered }),
}));
