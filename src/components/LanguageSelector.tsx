import { Select, SelectContent, SelectTrigger , SelectItem, SelectValue} from "@/components/ui/select";
import React from "react";

/**
 * A reusable component for selecting a language from a list of options.
 */
const LanguageSelector: React.FC<{
    value: string;
    onChange: (value: string) => void;
    label: string;
    options: { value: string; label: string }[];
}> = ({ value, onChange, label, options }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{label}</label>
        <Select value={options.find(option => option.value === value) || null} onValueChange={onChange} options={[]}>
            <SelectTrigger className="w-full">
                <SelectValue>
                    {value ? options.find(option => option.value === value)?.label : `Select ${label}...`}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {options.map(option => (
                    <SelectItem key={option.value} data-value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);

export default LanguageSelector;