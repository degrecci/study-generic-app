import Head from 'next/head';
import {
  Segment,
  Header,
  Form,
  Button,
  Grid,
  Message,
} from 'semantic-ui-react';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid
          textAlign="center"
          style={{ height: '100vh' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="red" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="big">
              <Segment>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />

                <Button color="red" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              Do not have account? <a href="#">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </main>
      <footer></footer>
    </div>
  );
}
