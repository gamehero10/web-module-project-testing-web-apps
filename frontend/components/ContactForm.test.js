import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
render(<ContactForm />);
});

test('renders the contact form header', () => {

// Arrange
render(<ContactForm />);

// Act
const header = screen.getByText('Contact Form');

// Assert
expect(header).toBeInTheDocument();
expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {

// Arrange 
render(<ContactForm />);

// Act
const firstNameField = screen.getByLabelText(/first name*/i);
userEvent.type(firstNameField, '123');

// Assert
const errorMessages = await screen.findAllByTestId('error');
expect(errorMessages).toHaveLength(1);

});

test('renders THREE error messages if user enters no values into any fields.', async () => {

// Arrange
render(<ContactForm />);

// Act
const submitButton = screen.getByRole('button');
userEvent.click(submitButton);

// Assert
await waitFor(() => {
    const errorMessages = screen.queryAllByTestId('error');
    expect(errorMessages).toHaveLength(3);
})
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

// Arrange
render(<ContactForm />);

// Act
const firstNameField = screen.getByLabelText(/first name*/i);
userEvent.type(firstNameField, 'warren');

const lastNameField = screen.getByLabelText(/last name*/i);
userEvent.type(lastNameField, 'longmire');

const button = screen.getByRole('button');
userEvent.click(button);

// Assert
const errorMessages = await screen.getAllByTestId('error');
expect(errorMessages).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

// Arrange
render(<ContactForm />);

// Act
const emailField = screen.getByLabelText(/email*/i);
userEvent.type(emailField, 'warren@gamil');

// Assert
const errorMessage = await screen.findByText(/email must be a valid email address/i);
expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

// Arrange
render(<ContactForm />);

// Act
const submitButton = screen.getByRole('button');
userEvent.click(submitButton);

// Assert 
const errorMessage = await screen.findByText(/lastName is a required field/i);
expect(errorMessage).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

// Arrange
render(<ContactForm />);

// Act
const firstNameField = screen.getByLabelText(/first name*/i);
const lastNameField = screen.getByLabelText(/last name*/i);
const emailField = screen.getByLabelText(/email*/i);

userEvent.type(firstNameField, 'warren');
userEvent.type(lastNameField, 'longmire');
userEvent.type(emailField, 'longmire@email.com');

const button = screen.getByRole('button');
userEvent.click(button);

// Assert
await waitFor(() => {
    const firstnameDisplay = screen.queryByText('warren');
    const lastnameDisplay = screen.queryByText('longmire');
    const emailDisplay = screen.queryByText('longmire@email.com');
    const messageDisplay = screen.queryByTestId('messageDisplay');

    expect(firstnameDisplay).toBeInTheDocument();
    expect(lastnameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).not.toBeInTheDocument();
})


});

test('renders all fields text when all fields are submitted.', async () => {

// Arrange
render(<ContactForm />);

// Act
const firstNameField = screen.getByLabelText(/first name*/i);
const lastNameField = screen.getByLabelText(/last name*/i);
const emailField = screen.getByLabelText(/email*/i);
const messageField = screen.getByLabelText(/message/i);

userEvent.type(firstNameField, 'warren');
userEvent.type(lastNameField, 'longmire');
userEvent.type(emailField, 'longmire@email.com');
userEvent.type(messageField, 'Message Display');

const button = screen.getByRole('button');
userEvent.click(button);

// Assert
await waitFor(() => {
    const firstnameDisplay = screen.queryByText('warren');
    const lastnameDisplay = screen.queryByText('longmire');
    const emailDisplay = screen.queryByText('longmire@email.com');
    const messageDisplay = screen.queryByText('Message Display');

    expect(firstnameDisplay).toBeInTheDocument();
    expect(lastnameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeInTheDocument();
})
});
