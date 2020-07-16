import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  Segment,
  Header,
  Form,
  Button,
  Grid,
  Message,
} from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

export default function Home() {
  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    register({ name: 'username' }, { required: true });
    register({ name: 'password' }, { required: true });
  });

  const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password)
    }
  `;

  const [login, { error }] = useMutation(LOGIN);

  const onSubmit = ({ username, password }) => {
    console.log(username, password);
    login({ variables: { username: username, password: password } });
  };

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
            <Form size="big" onSubmit={handleSubmit(onSubmit)}>
              <Segment>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  name="username"
                  onChange={async (_, { name, value }) => setValue(name, value)}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={async (_, { name, value }) => setValue(name, value)}
                />

                {error && <Message negative>{error.message}</Message>}

                <Button color="red" fluid size="large" type="submit">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              Do not have account?{' '}
              <Link href="/sign-up">
                <a>Sign Up</a>
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </main>
    </div>
  );
}
