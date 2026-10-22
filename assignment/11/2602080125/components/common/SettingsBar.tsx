"use client";
import { Settings } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/context/SettingsContext";
import { cn } from "@/lib/utils";
import type { SortBy, SortOrder, StatusFilter } from "@/utils/sortTasks";

interface SettingsBarProps {
    filter: StatusFilter;
    onFilterChange: (value: StatusFilter) => void;
    counts: Record<StatusFilter, number>;
    sortBy: SortBy;
    onSortByChange: (value: SortBy) => void;
    order: SortOrder;
    onOrderChange: (value: SortOrder) => void;
}

const SettingsBar = ({
    filter, onFilterChange, counts, sortBy, onSortByChange, order, onOrderChange,
}: SettingsBarProps) => {
    const { theme, setTheme, language, setLanguage, translate } = useSettings();

    const filterLabels: Record<StatusFilter, string> = {
        all: translate.filterAll,
        todo: translate.todo,
        done: translate.done,
        overdue: translate.overdue,
    };
    const sortLabels: Record<SortBy, string> = {
        created: translate.sortCreated,
        title: translate.sortTitle,
        deadline: translate.sortDeadline,
    };
    const orderLabels: Record<SortOrder, string> = {
        asc: translate.ascending,
        desc: translate.descending,
    };

    const isActive = filter !== "all" || sortBy !== "created" || order !== "desc";

    const handleReset = () => {
        onFilterChange("all");
        onSortByChange("created");
        onOrderChange("desc");
    };

    return (
        <Popover>
            <PopoverTrigger
                aria-label={translate.settings}
                className={cn(buttonVariants({ variant: "outline", size: "icon" }), "relative")}
            >
                <Settings className="size-4" />
                {isActive && <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-primary" />}
            </PopoverTrigger>

            <PopoverContent align="end" className="flex w-64 flex-col gap-3 p-3">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">{translate.filterBy}</span>
                    <Select value={filter} onValueChange={(v) => v && onFilterChange(v as StatusFilter)}>
                        <SelectTrigger className="w-full">
                            <SelectValue>{filterLabels[filter]}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {(Object.keys(filterLabels) as StatusFilter[]).map((key) => (
                                <SelectItem key={key} value={key}>
                                    {filterLabels[key]} ({counts[key]})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">{translate.sortBy}</span>
                    <Select value={sortBy} onValueChange={(v) => v && onSortByChange(v as SortBy)}>
                        <SelectTrigger className="w-full">
                            <SelectValue>{sortLabels[sortBy]}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {(Object.keys(sortLabels) as SortBy[]).map((key) => (
                                <SelectItem key={key} value={key}>{sortLabels[key]}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">{translate.orderBy}</span>
                    <Select value={order} onValueChange={(v) => v && onOrderChange(v as SortOrder)}>
                        <SelectTrigger className="w-full">
                            <SelectValue>{orderLabels[order]}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {(Object.keys(orderLabels) as SortOrder[]).map((key) => (
                                <SelectItem key={key} value={key}>{orderLabels[key]}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button variant="outline" className="w-full" onClick={handleReset} disabled={!isActive}>
                    {translate.reset}
                </Button>

                <div className="mt-1 flex flex-col gap-4 border-t pt-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-muted-foreground">{translate.language}</span>
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant={language === "en" ? "default" : "outline"} onClick={() => setLanguage("en")}>
                                English
                            </Button>
                            <Button variant={language === "id" ? "default" : "outline"} onClick={() => setLanguage("id")}>
                                Indonesia
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{translate.darkMode}</span>
                        <Switch
                            checked={theme === "dark"}
                            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                            aria-label={translate.darkMode}
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover >
    );
};

export default SettingsBar;