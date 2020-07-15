import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Segment, Header, Form, Button, Grid } from 'semantic-ui-react';

export default function SignUp() {
  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    register({ name: 'username' }, { required: true });
    register({ name: 'password' }, { required: true });
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Head>
        <title>Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/">
        <a>{`< Voltar`}</a>
      </Link>
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="red" textAlign="center">
            Create your account
          </Header>
          <Form size="big" onSubmit={handleSubmit(onSubmit)}>
            <Segment>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                onChange={async (e, { name, value }) => {
                  setValue(name, value);
                }}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={async (e, { name, value }) => {
                  setValue(name, value);
                }}
              />

              <Button color="red" fluid size="large">
                Sign Up
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}
