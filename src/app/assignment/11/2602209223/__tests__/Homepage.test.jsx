import React from 'react';
import { render, screen } from '@testing-library/react';
import Homepage from '../homepage/page';

// Mock Next.js Script to avoid errors
jest.mock('next/script', () => {
    return {
        __esModule: true,
        default: () => {
            return <div data-testid="mock-script" />;
        },
    };
});

// Mock Firebase Firestore
jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    onSnapshot: jest.fn(() => jest.fn()), // returns unsubscribe function
    doc: jest.fn(),
    addDoc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn()
}));

// Mock Firebase Config
jest.mock('../firebase', () => ({
    db: {}
}));

describe('Homepage Component', () => {
    it('renders the main heading properly', () => {
        render(<Homepage />);
        
        // Cek heading Tasku ada
        const headingElement = screen.getByText(/Tasku/i);
        expect(headingElement).toBeInTheDocument();
        
        // Cek tombol Add New Task ada
        const addButton = screen.getByText(/Add New Task/i);
        expect(addButton).toBeInTheDocument();
    });
});
