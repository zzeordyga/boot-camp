"use client";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import DateTimePicker from "@/components/common/DateTimePicker";
import { useSettings } from "@/context/SettingsContext";
import { getTaskFormSchema, type TaskFormValues } from "@/schemas/TaskSchema";

interface TaskFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: TaskFormValues) => Promise<void> | void;
    initialValues?: Partial<TaskFormValues>;
    mode?: "add" | "edit";
}

const defaultValues: TaskFormValues = {
    title: "",
    dueDate: null
};

const TaskFormDialog = ({ open, onOpenChange, onSubmit, initialValues, mode = "add" }: TaskFormDialogProps) => {
    const { translate } = useSettings();
    const schema = useMemo(() => getTaskFormSchema(translate), [translate]);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {
            errors,
            isSubmitting
        },
    } = useForm<TaskFormValues>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    useEffect(() => {
        if (open) {
            reset({
                title: initialValues?.title ?? "",
                dueDate: initialValues?.dueDate ?? null,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const submit = async (values: TaskFormValues) => {
        try {
            await onSubmit(values);
            onOpenChange(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode === "add" ? translate.newTask : translate.editTask}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
                    <Field>
                        <FieldLabel htmlFor="title">{translate.titleLabel}</FieldLabel>
                        <Input
                            id="title"
                            placeholder={translate.titlePlaceholder}
                            maxLength={100}
                            autoFocus
                            aria-invalid={!!errors.title}
                            {...register("title")}
                        />
                        {errors.title && <FieldError>{errors.title.message}</FieldError>}
                    </Field>

                    <Field>
                        <FieldLabel>{translate.deadlineLabel}</FieldLabel>
                        <Controller
                            name="dueDate"
                            control={control}
                            render={({ field }) => (
                                <DateTimePicker value={field.value} onChange={field.onChange} />
                            )}
                        />
                    </Field>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            {translate.cancel}
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? translate.saving : mode === "add" ? translate.add : translate.save}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TaskFormDialog;