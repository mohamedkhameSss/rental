"use client"
import { create } from "zustand";

interface RegisterModelStore {
    isOpen:boolean;
    onClose:()=>void;
    onOpen:()=>void;
}
const useRegisterModel = create<RegisterModelStore>((set) => ({
  isOpen:false,
  onOpen:()=>set({isOpen:true}),
  onClose:()=>set({isOpen:false})
  
}))

export default useRegisterModel;