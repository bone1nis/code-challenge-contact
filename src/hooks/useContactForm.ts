import { useState, useCallback, ChangeEvent } from "react";

import { Contact } from "../types";

export const useContactForm = (initialContact: Partial<Contact>) => {
    const [contact, setContact] = useState<Partial<Contact>>(initialContact);
    const [error, setError] = useState<string | null>(null);

    const handleEditChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Contact) => {
            setContact((prev) => ({
                ...prev,
                [field]: e.target.value,
            }));
        },
        []
    );

    const validateFields = useCallback((): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{10,15}$/;

        if (!contact.firstName || !contact.lastName || !contact.email || !contact.phoneNumber) {
            setError("Заполните все обязательные поля (Имя, Фамилия, Телефон, Почта)");
            return false;
        }

        if (!emailRegex.test(contact.email)) {
            setError("Введите корректный email (пример: example@gmail.com)");
            return false;
        }

        if (!phoneRegex.test(contact.phoneNumber)) {
            setError("Введите корректный номер телефона (пример: +79781234567)");
            return false;
        }

        setError(null);
        return true;
    }, [contact]);

    return { contact, setContact, error, setError, handleEditChange, validateFields };
};