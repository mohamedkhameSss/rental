"use client"
import { create } from "zustand";

interface RentModelStore {
    isOpen:boolean;
    onClose:()=>void;
    onOpen:()=>void;
}
const useRentModel = create<RentModelStore>((set) => ({
  isOpen:false,
  onOpen:()=>set({isOpen:true}),
  onClose:()=>set({isOpen:false})
  
}))

export default useRentModel;