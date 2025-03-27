import { useState, useCallback, useMemo } from 'react';

import { Paper, Stack, Typography, Button, Box, Divider, TextField, Alert } from '@mui/material';
import { red, grey } from '@mui/material/colors';
import { RemoveCircle, Description, Phone, Mail, Work } from '@mui/icons-material';
import theme from '../theme';

import { useStore } from '../stores/RootStoreContext';

import { Contact } from '../types';

import { useContactForm } from '../hooks/useContactForm';

import ContactDialog from './ContactDialog';

type ContactCardProps = {
    contact: Contact;
};

const iconStyle = {
    color: theme.palette.primary.main,
    transition: 'color 0.3s',
    '&:hover': {
        color: theme.palette.secondary.main
    }
};

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
    const { contactsStore } = useStore();
    const { contact: editedContact, setContact: setEditedContact, error, setError, handleEditChange, validateFields } = useContactForm({
        firstName: contact.firstName,
        lastName: contact.lastName,
        middleName: contact.middleName || '',
        phoneNumber: contact.phoneNumber,
        email: contact.email,
        company: contact.company || '',
        jobTitle: contact.jobTitle || ''
    });
    const [isEditing, setIsEditing] = useState(false);

    const [dialogState, setDialogState] = useState<{ type: 'save' | 'delete' | null; open: boolean }>({
        type: null,
        open: false
    });

    const startEditing = useCallback(() => {
        setIsEditing(true);
        setDialogState({ type: null, open: false });
        setError(null);
    }, [setError]);

    const changedFields = useMemo((): Partial<Contact> => {
        const changes: Partial<Contact> = {};

        if (editedContact.firstName !== contact.firstName) changes.firstName = editedContact.firstName;
        if (editedContact.lastName !== contact.lastName) changes.lastName = editedContact.lastName;
        if (editedContact.middleName !== (contact.middleName || "")) {
            changes.middleName = editedContact.middleName || null;
        }
        if (editedContact.phoneNumber !== contact.phoneNumber) changes.phoneNumber = editedContact.phoneNumber;
        if (editedContact.email !== contact.email) changes.email = editedContact.email;
        if (editedContact.company !== (contact.company || "")) {
            changes.company = editedContact.company || null;
        }
        if (editedContact.jobTitle !== (contact.jobTitle || "")) {
            changes.jobTitle = editedContact.jobTitle || null;
        }

        return changes;
    }, [
        editedContact,
        contact
    ]);

    const hasChanges = useMemo(() => Object.keys(changedFields).length > 0, [changedFields]);

    const onSaveChanges = useCallback(() => {
        if (!validateFields()) return;

        if (hasChanges) {
            setDialogState({ type: 'save', open: true });
        } else {
            setIsEditing(false);
        }
    }, [hasChanges, validateFields]);

    const handleSaveChanges = useCallback(() => {
        if (hasChanges && validateFields()) {

            contactsStore.updateContact(contact.id, changedFields);

            setIsEditing(false);
            setDialogState({ type: null, open: false });
        }
    }, [
        contactsStore,
        changedFields,
        contact.id,
        hasChanges,
        validateFields
    ]);

    const handleCancelChanges = useCallback(() => {
        setEditedContact({
            firstName: contact.firstName,
            lastName: contact.lastName,
            middleName: contact.middleName || '',
            phoneNumber: contact.phoneNumber,
            email: contact.email,
            company: contact.company || '',
            jobTitle: contact.jobTitle || ''
        });
        setDialogState({ type: null, open: false });
        setError(null);
        setIsEditing(false);
    }, [
        contact,
        setError,
        setEditedContact
    ]);

    const startDeleteContact = useCallback(() => {
        setIsEditing(false);
        setDialogState({ type: 'delete', open: true });
    }, []);

    const handleDeleteContact = useCallback(() => {
        contactsStore.removeContact(contact.id);
        setDialogState({ type: null, open: false });
    }, [
        contactsStore,
        contact.id
    ]);

    const handleCancelDelete = useCallback(() => {
        setDialogState({ type: null, open: false });
    }, []);

    return (
        <Paper
            sx={{
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                transition: '0.3s ease-in-out',
                width: "100%",
                '&:hover': {
                    boxShadow: 6,
                    transform: 'scale(1.01)',
                },
            }}
        >
            <Stack direction="column" gap={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="start">
                    {isEditing ? (
                        <Stack direction="column" gap={2}>
                            <TextField
                                label="Имя"
                                value={editedContact.firstName}
                                onChange={(e) => handleEditChange(e, 'firstName')}
                                size="small"
                                required
                            />
                            <TextField
                                label="Фамилия"
                                value={editedContact.lastName}
                                onChange={(e) => handleEditChange(e, 'lastName')}
                                size="small"
                                required
                            />
                            <TextField
                                label="Отчество"
                                value={editedContact.middleName}
                                onChange={(e) => handleEditChange(e, 'middleName')}
                                size="small"
                            />
                        </Stack>
                    ) : (
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                color: theme.palette.primary.main,
                            }} >
                            {contact.firstName} {contact.lastName} {contact.middleName}
                        </Typography>
                    )}

                    <Button
                        sx={{ minWidth: "auto" }}
                        onClick={startDeleteContact}>
                        <RemoveCircle sx={{ color: red[400] }} />
                    </Button>
                </Stack>

                <Divider sx={{ borderColor: grey[300] }} />

                <Box>
                    <Stack
                        direction="column"
                        gap={1}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={1}>
                            <Phone sx={iconStyle} />
                            {isEditing ? (
                                <TextField
                                    label="Телефон"
                                    value={editedContact.phoneNumber}
                                    onChange={(e) => handleEditChange(e, "phoneNumber")}
                                    size="small"
                                    required
                                />
                            ) : (
                                <Typography variant="body2">
                                    Телефон: {contact.phoneNumber}
                                </Typography>
                            )}
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={1}>
                            <Mail sx={iconStyle} />
                            {isEditing ? (
                                <TextField
                                    label="Почта"
                                    value={editedContact.email}
                                    onChange={(e) => handleEditChange(e, "email")}
                                    size="small"
                                    required
                                />
                            ) : (
                                <Typography variant="body2">
                                    Почта: {contact.email}
                                </Typography>
                            )}
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={1}>
                            <Work sx={iconStyle} />
                            {isEditing ? (
                                <TextField
                                    label="Компания"
                                    value={editedContact.company}
                                    onChange={(e) => handleEditChange(e, "company")}
                                    size="small"
                                />
                            ) : (
                                <Typography variant="body2">
                                    Компания: {contact.company || "Неизвестно"}
                                </Typography>
                            )}
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={1}>
                            <Description sx={iconStyle} />
                            {isEditing ? (
                                <TextField
                                    label="Должность"
                                    value={editedContact.jobTitle}
                                    onChange={(e) => handleEditChange(e, "jobTitle")}
                                    size="small"
                                />
                            ) : (
                                <Typography variant="body2">
                                    Должность: {contact.jobTitle || "Неизвестно"}
                                </Typography>
                            )}
                        </Stack>
                    </Stack>
                </Box>

                {error && <Alert severity="error">{error}</Alert>}

                {isEditing ? (
                    <Stack
                        direction="row"
                        gap={2}>
                        <Button
                            variant="contained"
                            onClick={onSaveChanges}>
                            Сохранить
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleCancelChanges}>
                            Отменить
                        </Button>
                    </Stack>
                ) : (
                    <Button
                        variant="outlined"
                        onClick={startEditing}>
                        Редактировать
                    </Button>
                )}
            </Stack>

            <ContactDialog
                isOpen={dialogState.open && dialogState.type === 'save'}
                title="Вы точно хотите сохранить изменения?"
                onClose={handleCancelChanges}
                onConfirm={handleSaveChanges} />

            <ContactDialog
                isOpen={dialogState.open && dialogState.type === 'delete'}
                title="Вы точно хотите удалить контакт?"
                onClose={handleCancelDelete}
                onConfirm={handleDeleteContact} />
        </Paper>
    );
};

export default ContactCard;