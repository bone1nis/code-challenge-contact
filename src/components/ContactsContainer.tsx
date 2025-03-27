import { Box, Grid2 } from '@mui/material';

import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/RootStoreContext';

import ContactCard from './ContactCard';

const ContactsContainer: React.FC = observer(() => {
  const { contactsStore } = useStore();
  const contacts = contactsStore.contacts;
  return (
    <Box sx={{ padding: 2 }}>
      <Grid2
        container
        spacing={3}>
        {contacts.map(contact => (
          <Grid2
            size={{
              xs: 12,
              sm: 6,
              md: 4
            }}
            key={contact.id}>
            <ContactCard contact={contact} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
});

export default ContactsContainer;
