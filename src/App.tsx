import { Box, Container } from '@mui/material';

import ContactsContainer from './components/ContactsContainer';
import ContactForm from './components/ContactForm';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container sx={{ flex: 1 }}>
        <ContactForm />
        <ContactsContainer />
      </Container>
      <Footer />
    </Box>
  );
};

export default App;