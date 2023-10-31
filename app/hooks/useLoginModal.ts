"use client"
import { create } from "zustand";

interface LoginModelStore {
    isOpen:boolean;
    onClose:()=>void;
    onOpen:()=>void;
}
const useLoginModel = create<LoginModelStore>((set) => ({
  isOpen:false,
  onOpen:()=>set({isOpen:true}),
  onClose:()=>set({isOpen:false})
  
}))

export default useLoginModel;