import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from "./index"

describe('Button', () => {

    const mockHandleDeletePoint = jest.fn()
    const props = {
        handleDeletePoint: mockHandleDeletePoint
    }

    it('Button element to be in the document', () => { 
        render(<Button {...props} />)
        const buttonElement = screen.getByRole('button')
        expect(buttonElement).toBeInTheDocument()
    })

    it('Should call delete function', () => {
        render(<Button {...props} />)
        const buttonElement = screen.getByRole('button')
        fireEvent.click(buttonElement)
        expect(mockHandleDeletePoint).toHaveBeenCalledTimes(1)
    })
    
})