import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const MotAccordion = AccordionPrimitive.Root;

const MotAccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
));
MotAccordionItem.displayName = "AccordionItem";

const MotAccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
	const [isActive, setIsActive] = React.useState(false);
	const toggleClass = () => setIsActive(!isActive);
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				ref={ref}
				className={cn(
					`flex flex-1 items-center justify-between p-4 font-medium transition-all hover:brightness-75 active:brightness-75 [&[data-state=open]>svg]:rotate-180 ${isActive ? "rounded-t-lg" : "rounded-lg"}`,
					className,
				)}
				onClick={toggleClass}
				{...props}
			>
				{children}
				<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
});
MotAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const MotAccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
		{...props}
	>
		<div className={cn("pb-4 pt-0", className)}>{children}</div>
	</AccordionPrimitive.Content>
));

MotAccordionContent.displayName = AccordionPrimitive.Content.displayName;

export {
	MotAccordion,
	MotAccordionItem,
	MotAccordionTrigger,
	MotAccordionContent,
};
