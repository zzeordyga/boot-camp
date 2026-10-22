"use client";
import { useState } from "react";
import { CalendarIcon, ChevronDown, Clock2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useSettings } from "@/context/SettingsContext";
import { cn } from "@/lib/utils";
import { formatDueDate } from "@/utils/taskStatus";

interface DateTimePickerProps {
    value: string | null;
    onChange: (value: string | null) => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

const DateTimePicker = ({ value, onChange }: DateTimePickerProps) => {
    const { translate, language } = useSettings();
    const [expanded, setExpanded] = useState(false);

    const date = value ? new Date(value) : undefined;
    const time = date ? `${pad(date.getHours())}:${pad(date.getMinutes())}` : "00:00";

    const handleSelectDate = (selected?: Date) => {
        if (!selected) return onChange(null);
        const [h, m] = time.split(":").map(Number);
        const next = new Date(selected);
        next.setHours(h, m, 0, 0);
        onChange(next.toISOString());
    };

    const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!date || !e.target.value) return;
        const [h, m] = e.target.value.split(":").map(Number);
        const next = new Date(date);
        next.setHours(h, m, 0, 0);
        onChange(next.toISOString());
    };

    return (
        <div className="flex flex-col">
            <Button
                type="button"
                variant="outline"
                aria-expanded={expanded}
                className={cn("w-full justify-start font-normal", !value && "text-muted-foreground")}
                onClick={() => setExpanded((v) => !v)}
            >
                <CalendarIcon className="mr-2 size-4" />
                {value ? formatDueDate(value, language) : translate.pickDeadline}
                <ChevronDown
                    className={cn(
                        "ml-auto size-4 transition-transform duration-300",
                        expanded && "rotate-180"
                    )}
                />
            </Button>

            <div
                className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    expanded ? "mt-2 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                )}
                aria-hidden={!expanded}
                inert={!expanded}
            >
                <div className="overflow-hidden">
                    <div className="flex flex-col items-center gap-3 rounded-lg border p-3">
                        <Calendar mode="single" selected={date} onSelect={handleSelectDate} />
                        <Field className="w-full">
                            <FieldLabel htmlFor="due-time">{translate.time}</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    id="due-time"
                                    type="time"
                                    value={time}
                                    onChange={handleChangeTime}
                                    disabled={!date}
                                    className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                                />
                                <InputGroupAddon>
                                    <Clock2Icon className="text-muted-foreground" />
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full"
                            disabled={!value}
                            onClick={() => onChange(null)}
                        >
                            {translate.removeDeadline}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateTimePicker;