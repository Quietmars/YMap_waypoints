import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PointsItem } from "./index"

jest.mock('react', () => {
    return {
        ...jest.requireActual('react'),
        useState: jest.fn(),
    }
})

describe('PointsItem', () => {

    const mockSetPointState = jest.fn()
    useState.mockImplementation(init => [init, mockSetPointState])

    const mockHandleChangePointPosition = jest.fn()
    const props = {
        title: 'Test title',
        index: 12,
        handleDeletePoint: jest.fn(),
        handleChangePointPosition: mockHandleChangePointPosition
    }

    afterEach(() => jest.clearAllMocks())

    it('Point item should to be in the document', () => {
        render(<PointsItem {...props} />)
        const pointItemElement = screen.getByText(props.title)
        expect(pointItemElement).toBeInTheDocument()
    })

    it('dragStart', async () => {
        render(<PointsItem {...props} />)
        const pointItemElement = screen.getByText(props.title)
        fireEvent.dragStart(pointItemElement, { dataTransfer: { setData: jest.fn() } })
        await waitFor(() => expect(mockSetPointState).toHaveBeenCalledTimes(1))
    })

    it('dragEnd', async () => {
        render(<PointsItem {...props} />)
        const pointItemElement = screen.getByText(props.title)
        fireEvent.dragEnd(pointItemElement)
        await waitFor(() => expect(mockSetPointState).toHaveBeenCalledTimes(1))
    })

    it('dragOver', async () => {
        render(<PointsItem {...props} />)
        const pointItemElement = screen.getByText(props.title)
        fireEvent.dragOver(pointItemElement)
        await waitFor(() => expect(mockSetPointState).toHaveBeenCalledTimes(1))
    })

    it('dragLeave', async () => {
        render(<PointsItem {...props} />)
        const pointItemElement = screen.getByText(props.title)
        fireEvent.dragLeave(pointItemElement)
        await waitFor(() => expect(mockSetPointState).toHaveBeenCalledTimes(1))
    })

    it('onDrop should call handleChangePointPosition()', () => {
        render(<PointsItem {...props} />)
        const pointItemElement = screen.getByText(props.title)
        fireEvent.drop(pointItemElement, { dataTransfer: { getData: jest.fn() } })
        expect(mockHandleChangePointPosition).toHaveBeenCalledTimes(1)
    })
})