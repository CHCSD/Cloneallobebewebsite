import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

export function Accordion({ 
  title, 
  icon: Icon, 
  children, 
  defaultOpen = false 
}: { 
  title: string, 
  icon: any, 
  children: React.ReactNode, 
  defaultOpen?: boolean 
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-100 py-6 last:border-0 first:pt-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between group text-left"
      >
        <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
          <Icon size={20} className="text-[#87A878]" /> {title}
        </h2>
        <span className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-[#F0F4EE] transition-colors shrink-0 ml-4">
          {isOpen ? <Minus size={16} className="text-[#87A878]" /> : <Plus size={16} className="text-gray-400 group-hover:text-[#87A878]" />}
        </span>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}