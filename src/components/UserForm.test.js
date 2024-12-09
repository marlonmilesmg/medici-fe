import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserForm from "./UserForm";
import { createUser } from "../services/userService";

// Mock the `createUser` service function
jest.mock("../services/userService");

describe("UserForm Component", () => {
    test("renders form elements correctly", () => {
        render(<UserForm />);

        // Check if input fields and buttons are rendered
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /back to home/i })).toBeInTheDocument();
    });

    test("displays success message when user is registered", async () => {
        createUser.mockResolvedValueOnce({}); // Mock successful API response

        render(<UserForm />);

        // Fill out the form
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "testuser" } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "testuser@example.com" } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: /register/i }));

        // Wait for the success message to appear
        expect(await screen.findByText(/user registered successfully/i)).toBeInTheDocument();
    });

    test("displays error message on registration failure", async () => {
        createUser.mockRejectedValueOnce(new Error("Registration failed")); // Mock API error

        render(<UserForm />);

        // Fill out the form
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "testuser" } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "testuser@example.com" } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: /register/i }));

        // Wait for the error message to appear
        expect(await screen.findByText(/error registering user/i)).toBeInTheDocument();
    });
});
