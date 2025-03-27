import { FormEvent, useCallback, useState } from "react";

import { Box, Button, Stack, TextField, Typography, Paper, Alert } from "@mui/material";

import { useStore } from "../stores/RootStoreContext";

import { useContactForm } from '../hooks/useContactForm';

import ContactDialog from "./ContactDialog";

const ContactForm: React.FC = () => {
  const { contactsStore } = useStore();

  const { contact: newContact, setContact, error, handleEditChange, validateFields } = useContactForm({
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
    email: "",
    jobTitle: "",
    company: "",
  });

  const [isDialogOpen, setDialogOpen] = useState(false);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!validateFields()) return;
      setDialogOpen(true);
    },
    [validateFields]
  );

  const handleConfirm = useCallback(() => {
    contactsStore.addContact({
      id: crypto.randomUUID(),
      firstName: newContact.firstName as string,
      lastName: newContact.lastName as string,
      middleName: newContact.middleName || null,
      phoneNumber: newContact.phoneNumber as string,
      email: newContact.email as string,
      jobTitle: newContact.jobTitle || null,
      company: newContact.company || null,
    });

    setDialogOpen(false);
    setContact({
      firstName: "",
      lastName: "",
      middleName: "",
      phoneNumber: "",
      email: "",
      jobTitle: "",
      company: "",
    });
  }, [newContact, setContact, contactsStore]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Новый контакт
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form">
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
          <TextField
            label="Имя"
            variant="outlined"
            value={newContact.firstName}
            onChange={(e) => handleEditChange(e, "firstName")}
            required
            fullWidth
          />
          <TextField
            label="Фамилия"
            variant="outlined"
            value={newContact.lastName}
            onChange={(e) => handleEditChange(e, "lastName")}
            required
            fullWidth
          />
          <TextField
            label="Отчество"
            variant="outlined"
            value={newContact.middleName}
            onChange={(e) => handleEditChange(e, "middleName")}
            fullWidth
          />
        </Stack>

        <Stack spacing={2} direction={{ xs: "column", sm: "row" }} sx={{ mt: 2 }}>
          <TextField
            label="Телефон"
            variant="outlined"
            value={newContact.phoneNumber}
            onChange={(e) => handleEditChange(e, "phoneNumber")}
            required
            fullWidth
          />
          <TextField
            label="Почта"
            variant="outlined"
            value={newContact.email}
            onChange={(e) => handleEditChange(e, "email")}
            required
            fullWidth
          />
        </Stack>

        <Stack spacing={2} direction={{ xs: "column", sm: "row" }} sx={{ mt: 2 }}>
          <TextField
            label="Компания"
            variant="outlined"
            value={newContact.company}
            onChange={(e) => handleEditChange(e, "company")}
            fullWidth
          />
          <TextField
            label="Должность"
            variant="outlined"
            value={newContact.jobTitle}
            onChange={(e) => handleEditChange(e, "jobTitle")}
            fullWidth
          />
        </Stack>

        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          fullWidth
          sx={{ mt: 3 }}
        >
          Создать
        </Button>
      </Box>

      <ContactDialog
        isOpen={isDialogOpen}
        title="Вы уверены, что хотите создать контакт?"
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
      />
    </Paper>
  );
};

export default ContactForm;