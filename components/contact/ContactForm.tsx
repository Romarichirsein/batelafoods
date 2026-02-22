"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function buildSchema(t: ReturnType<typeof useTranslations>) {
    return z.object({
        name: z.string().min(1, t("name_required")),
        contact: z.string().min(1, t("contact_required")),
        subject: z.string().min(1, t("subject_required")),
        message: z.string().min(10, t("message_min")),
    });
}

export function ContactForm() {
    const t = useTranslations("contact");
    const tVal = useTranslations("validation");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const schema = buildSchema(tVal);
    type FormData = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: FormData) => {
        setStatus("sending");
        // Simulate API call
        await new Promise((r) => setTimeout(r, 1500));
        console.log("Contact form submission:", data);
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 5000);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            aria-label="Formulaire de contact"
            noValidate
        >
            {/* Name */}
            <div className="space-y-1.5">
                <Label htmlFor="contact-name">
                    {t("form_name")} <span className="text-neon-red">*</span>
                </Label>
                <Input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    placeholder={t("form_name_placeholder")}
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    className="bg-muted focus-visible:ring-neon-green"
                />
                {errors.name && (
                    <p className="text-neon-red text-xs flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3 h-3" /> {errors.name.message}
                    </p>
                )}
            </div>

            {/* Phone/Email */}
            <div className="space-y-1.5">
                <Label htmlFor="contact-email">
                    {t("form_email")} <span className="text-neon-red">*</span>
                </Label>
                <Input
                    id="contact-email"
                    type="text"
                    autoComplete="email"
                    placeholder={t("form_email_placeholder")}
                    {...register("contact")}
                    aria-invalid={!!errors.contact}
                    className="bg-muted focus-visible:ring-neon-green"
                />
                {errors.contact && (
                    <p className="text-neon-red text-xs flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3 h-3" /> {errors.contact.message}
                    </p>
                )}
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
                <Label htmlFor="contact-subject">
                    {t("form_subject")} <span className="text-neon-red">*</span>
                </Label>
                <Input
                    id="contact-subject"
                    type="text"
                    placeholder={t("form_subject_placeholder")}
                    {...register("subject")}
                    aria-invalid={!!errors.subject}
                    className="bg-muted focus-visible:ring-neon-green"
                />
                {errors.subject && (
                    <p className="text-neon-red text-xs flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3 h-3" /> {errors.subject.message}
                    </p>
                )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
                <Label htmlFor="contact-message">
                    {t("form_message")} <span className="text-neon-red">*</span>
                </Label>
                <Textarea
                    id="contact-message"
                    rows={5}
                    placeholder={t("form_message_placeholder")}
                    {...register("message")}
                    aria-invalid={!!errors.message}
                    className="bg-muted focus-visible:ring-neon-green resize-y min-h-[120px]"
                />
                {errors.message && (
                    <p className="text-neon-red text-xs flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3 h-3" /> {errors.message.message}
                    </p>
                )}
            </div>

            {/* Submit button */}
            <Button
                type="submit"
                disabled={status === "sending"}
                variant="neon"
                className="w-full animate-neon-pulse-red h-12 text-base"
            >
                {status === "sending" ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        {t("form_sending")}
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4 mr-2" />
                        {t("form_submit")}
                    </>
                )}
            </Button>

            {/* Status messages */}
            {status === "success" && (
                <div
                    className="flex items-start gap-3 p-4 rounded-lg border border-neon-green/40
                     bg-neon-green/10 text-neon-green"
                    role="status"
                >
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-body">{t("form_success")}</p>
                </div>
            )}
        </form>
    );
}
