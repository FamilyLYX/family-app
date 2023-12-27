import { create } from "zustand";

interface iHoveredChip {
  isChipHovered: boolean;
  setChipHovered: (isHovered: boolean) => void;
}


export const useHoveredChip = create<iHoveredChip>((set) => ({
  isChipHovered: false,
  setChipHovered: (isHovered: boolean) => set({ isChipHovered: isHovered }),
}));

export const isMobile = window.innerWidth < 768;

