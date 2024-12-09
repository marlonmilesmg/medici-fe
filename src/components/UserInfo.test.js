import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import UserInfo from "./UserInfo";
import { getUser } from "../services/userService";

// Mock the `getUser` service function
jest.mock("../services/userService");

describe("UserInfo Component", () => {
    test("renders input and buttons correctly", () => {
        render(
            <BrowserRouter>
                <UserInfo />
            </BrowserRouter>
        );

        // Check if input and buttons are rendered
        expect(screen.getByLabelText(/user id/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /fetch user info/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /back to home/i })).toBeInTheDocument();
    });

    test("displays user info when user is found", async () => {
        // Mock the API call to return a user
        getUser.mockResolvedValueOnce({
            data: {
                id: 1,
                username: "testuser",
                email: "testuser@example.com",
            },
        });

        render(
            <BrowserRouter>
                <UserInfo />
            </BrowserRouter>
        );

        // Enter a User ID and click Fetch
        fireEvent.change(screen.getByLabelText(/user id/i), { target: { value: "1" } });
        fireEvent.click(screen.getByRole("button", { name: /fetch user info/i }));

        // Wait for the user info to appear
        await waitFor(() => {
            expect(screen.getByText(/id:/i)).toHaveTextContent("1");
            expect(screen.getByText(/username:/i)).toHaveTextContent("testuser");
            expect(screen.getByText(/email:/i)).toHaveTextContent("testuser@example.com");
        });
    });

    test("displays error message when user is not found", async () => {
        // Mock the API call to return an error
        getUser.mockRejectedValueOnce(new Error("User not found"));

        render(
            <BrowserRouter>
                <UserInfo />
            </BrowserRouter>
        );

        // Enter a User ID and click Fetch
        fireEvent.change(screen.getByLabelText(/user id/i), { target: { value: "999" } });
        fireEvent.click(screen.getByRole("button", { name: /fetch user info/i }));

        // Wait for the error message to appear
        await waitFor(() => {
            expect(screen.getByText(/user not found/i)).toBeInTheDocument();
        });
    });
});
