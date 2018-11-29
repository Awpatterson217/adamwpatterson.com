import Nav from './nav';
import Context from './context';
import Footer from './footer';

import { Container } from 'semantic-ui-react';

const dashboard = () => {
    return (
      <Container>
        <Nav />
        <Context />
        <Footer />
      </Container>
    );
}

export default dashboard;
