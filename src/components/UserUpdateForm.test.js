import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import UserUpdateForm from "./UserUpdateForm";
import { updateUser, deleteUser } from "../services/userService";

// Mock the service functions
jest.mock("../services/userService");

describe("UserUpdateForm Component", () => {
    test("renders form and buttons correctly", () => {
        render(
            <BrowserRouter>
                <UserUpdateForm />
            </BrowserRouter>
        );

        // Verify input fields and buttons are rendered
        expect(screen.getByLabelText(/user id/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /delete user/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /back to home/i })).toBeInTheDocument();
    });

    test("displays success message when user is updated", async () => {
        updateUser.mockResolvedValueOnce({}); // Mock successful API response

        render(
            <BrowserRouter>
                <UserUpdateForm />
            </BrowserRouter>
        );

        // Fill out the form and submit
        fireEvent.change(screen.getByLabelText(/user id/i), { target: { value: "1" } });
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "updateduser" } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "updated@example.com" } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "newpassword" } });
        fireEvent.click(screen.getByRole("button", { name: /update/i }));

        // Wait for the success message
        expect(await screen.findByText(/user updated successfully/i)).toBeInTheDocument();
    });

    test("displays error message when update fails", async () => {
        updateUser.mockRejectedValueOnce(new Error("Update failed")); // Mock API error

        render(
            <BrowserRouter>
                <UserUpdateForm />
            </BrowserRouter>
        );

        // Fill out the form and submit
        fireEvent.change(screen.getByLabelText(/user id/i), { target: { value: "1" } });
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "updateduser" } });
        fireEvent.click(screen.getByRole("button", { name: /update/i }));

        // Wait for the error message
        expect(await screen.findByText(/error updating user/i)).toBeInTheDocument();
    });

    test("displays success message when user is deleted", async () => {
        deleteUser.mockResolvedValueOnce({}); // Mock successful delete response

        render(
            <BrowserRouter>
                <UserUpdateForm />
            </BrowserRouter>
        );

        // Delete the user
        fireEvent.change(screen.getByLabelText(/user id/i), { target: { value: "1" } });
        fireEvent.click(screen.getByRole("button", { name: /delete user/i }));

        // Wait for the success message
        expect(await screen.findByText(/user deleted successfully/i)).toBeInTheDocument();
    });

    test("displays error message when delete fails", async () => {
        deleteUser.mockRejectedValueOnce(new Error("Delete failed")); // Mock API error

        render(
            <BrowserRouter>
                <UserUpdateForm />
            </BrowserRouter>
        );

        // Delete the user
        fireEvent.change(screen.getByLabelText(/user id/i), { target: { value: "1" } });
        fireEvent.click(screen.getByRole("button", { name: /delete user/i }));

        // Wait for the error message
        expect(await screen.findByText(/error deleting user/i)).toBeInTheDocument();
    });
});
