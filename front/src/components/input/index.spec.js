import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from "./index"
import { ctx } from "../../store"

describe('Input', () => {

    const inputStringData = 'Test input string'
    const ctxValue = {
        store: {
            map: { getCenter: () => { } },
            pointsCollection: { add: () => { } }
        },
        updStore: () => { }
    }

    const contextWrap = (component) => {
        return <ctx.Provider value={ctxValue}>
            {component}
        </ctx.Provider>
    }

    const mockGeoObject = jest.fn()
    window.ymaps = {
        GeoObject: mockGeoObject,
        //ready: jest.fn(() => { })
    }

    it('Input should to be in the document', () => {
        render(contextWrap(<Input />))
        const inputElement = screen.getByRole('textbox')
        expect(inputElement).toBeInTheDocument()
    })

    it('Input value shoult contain text on change', () => {
        render(contextWrap(<Input />))
        const inputElement = screen.getByRole('textbox')
        fireEvent.change(inputElement, { target: { value: inputStringData } })
        expect(inputElement.value).toEqual(inputStringData)
    })

    it('Should create new waypoint on press enter', () => {
        render(contextWrap(<Input />))
        const inputElement = screen.getByRole('textbox')
        fireEvent.keyPress(inputElement, { key: 'Enter', keyCode: 13, which: 13 })
        expect(mockGeoObject).toHaveBeenCalledTimes(1)
    })

})