// "use client";

// import * as React from "react";
// import * as SwitchPrimitive from "@radix-ui/react-switch";

// import { cn } from "./utils";

// function Switch({
//   className,
//   ...props
// }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
//   return (
//     <SwitchPrimitive.Root
//       data-slot="switch"
//       className={cn(
//         "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
//         className,
//       )}
//       {...props}
//     >
//       <SwitchPrimitive.Thumb
//         data-slot="switch-thumb"
//         className={cn(
//           "bg-card dark:data-[state=unchecked]:bg-card-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
//         )}
//       />
//     </SwitchPrimitive.Root>
//   );
// }

// export { Switch };


"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "./utils";

export function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <form>
      <div className="flex items-center">
        
        <SwitchPrimitive.Root
          id="airplane-mode"
          className={cn(
            "relative h-[25px] w-[42px] cursor-pointer rounded-full shadow-[0_2px_10px] shadow-blackA4 outline-none focus:shadow-[0_0_0_2px]  transition-colors",
            "data-[state=unchecked]:bg-black data-[state=checked]:bg-[#2563EB]",
            className
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            className={cn(
              "block size-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-150 will-change-transform",
              "data-[state=checked]:translate-x-[19px]"
            )}
          />
        </SwitchPrimitive.Root>
      </div>
    </form>
  );
}

