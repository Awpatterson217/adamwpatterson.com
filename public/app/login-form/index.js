import { Button, Form, Grid, Segment } from 'semantic-ui-react'

import { Container } from 'semantic-ui-react';

const LoginForm = () => (
  <Container>
    <div className='login-form'>
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                type='password'
              />

              <Button color='black' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  </Container>
)

export default LoginForm