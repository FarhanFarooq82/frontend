import React, { forwardRef, ReactNode } from 'react';
import SelectPrimitive from 'react-select';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface SelectProps {
    value?: { value: string; label: string } | null;
    onValueChange?: (value: string) => void;
    options: { value: string; label: string }[];
    className?: string;
    children?: ReactNode;
    isDisabled?: boolean;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
    ({ value, onValueChange, options, className, children, ...props }, ref) => {

        const selectedOption = options.find(opt => opt.value === value?.value) || null;

        return (
            <div ref={ref} className={cn('relative', className)}>
                <SelectPrimitive
                    value={selectedOption}
                    onChange={(selected: any) => {
                        if (selected && onValueChange) {
                            onValueChange(selected.value);
                        }
                    }}
                    options={options}
                    classNamePrefix="react-select"
                    isSearchable={false}

                    styles={{
                        control: (baseStyles: any, state:any) => ({
                            ...baseStyles,
                            display: 'flex',
                            alignItems: 'center',
                            height: '2.25rem', // Corresponds to h-9 in Input.tsx
                            padding: '0.5rem',
                            borderWidth: '1px',
                            borderRadius: '0.375rem', // Corresponds to rounded-md
                            borderColor: state.isFocused ? '#2563eb' : '#d1d5db', // focus:ring-blue-500, border-input
                            backgroundColor: 'white', // bg-background
                            boxShadow: state.isFocused ? '0 0 0 2px rgba(37, 99, 235, 0.25)' : '0 1px 2px rgba(0, 0, 0, 0.05)', // focus:ring, shadow-sm
                            '&:hover': {
                                borderColor: state.isFocused ? '#2563eb' : '#d1d5db',
                            },
                            ...(props.isDisabled ? {
                                backgroundColor: '#f9fafb',
                                opacity: '0.5',
                                cursor: 'not-allowed'
                            } : {}),
                            outline: 'none',
                        }),
                        valueContainer: (baseStyles:any) => ({
                            ...baseStyles,
                            padding: 0,
                            margin: 0,
                        }),
                        singleValue: (baseStyles:any) => ({
                            ...baseStyles,
                            color: '#4b5563', // text-gray-700
                            margin: 0,
                        }),
                        placeholder: (baseStyles:any) => ({
                            ...baseStyles,
                            color: '#9ca3af', // placeholder:text-muted-foreground
                            margin: 0,
                        }),
                        indicatorsContainer: (baseStyles: any) => ({
                            ...baseStyles,
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                        }),
                        dropdownIndicator: (baseStyles:any, state:any) => ({
                            ...baseStyles,
                            color: '#6b7280', // text-gray-500
                            padding: 0,
                            transition: 'transform 0.2s ease',
                            transform: state.isFocused ? 'rotate(180deg)' : 'rotate(0deg)',
                            '&:hover': {
                                color: '#374151',  // hover:text-gray-700
                            }
                        }),
                        menu: (baseStyles:any) => ({
                            ...baseStyles,
                            backgroundColor: 'white', // bg-background
                            borderRadius: '0.375rem', // rounded-md
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-lg
                            marginTop: '0.25rem', // Add a little space
                            zIndex: 20,
                            border: '1px solid #e5e7eb'
                        }),
                        menuList: (baseStyles:any) => ({
                            ...baseStyles,
                            padding: '0.5rem 0',
                            maxHeight: '200px',
                            overflowY: 'auto'
                        }),
                        option: (baseStyles:any, state:any) => ({
                            ...baseStyles,
                            padding: '0.75rem 1rem',
                            color: state.isSelected ? '#fff' : '#4b5563',
                            backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#f0f9ff' : 'white',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: state.isSelected ? '#2563eb' : '#f0f9ff',
                                color: state.isSelected ? '#fff' : '#374151',
                            },
                            borderRadius: '0.25rem',
                            margin: '0 0.25rem',
                            transition: 'background-color 0.15s ease, color 0.15s ease'
                        }),
                        input: (baseStyles:any) => ({
                            ...baseStyles,
                            padding: 0,
                            margin: 0,
                        }),
                    }}
                    {...props}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
                    <ChevronDown className="h-5 w-5" />
                </div>
            </div>
        );
    }
);
Select.displayName = 'Select';

const SelectTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, children, ...props }, ref) => (
        <button
            ref={ref}
            className={cn(
                "flex items-center justify-between w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
);
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    ({ className, children, ...props }, ref) => (
        <span
            ref={ref}
            className={cn("text-sm", className)}
            {...props}
        >
            {children}
        </span>
    )
);
SelectValue.displayName = 'SelectValue';

const SelectContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "relative z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
);
SelectContent.displayName = 'SelectContent';

const SelectItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "px-2 py-1.5 text-sm",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
);

SelectItem.displayName = 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
