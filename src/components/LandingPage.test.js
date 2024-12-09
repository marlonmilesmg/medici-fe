import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import LandingPage from "./LandingPage";

describe("LandingPage Component", () => {
    test("renders welcome message and buttons", () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );

        // Verify welcome message
        expect(screen.getByText(/Welcome to User Management/i)).toBeInTheDocument();

        // Verify buttons are rendered with correct labels
        expect(screen.getByRole("button", { name: /Register User/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /View User Info/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Update User/i })).toBeInTheDocument();
    });

    test("links navigate to correct routes", () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );

        // Verify links point to correct routes
        expect(screen.getByRole("link", { name: /Register User/i })).toHaveAttribute("href", "/register");
        expect(screen.getByRole("link", { name: /View User Info/i })).toHaveAttribute("href", "/user-info");
        expect(screen.getByRole("link", { name: /Update User/i })).toHaveAttribute("href", "/update-user");
    });
});
