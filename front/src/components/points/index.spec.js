import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import { Points } from "./index"
import { ctx } from "../../store"

describe('Points', () => {

    const ctxValue = {
        store: {
            map: null,
            pointsCollection: {
                toArray: () => {
                    return [
                        {
                            properties: {
                                get: (val) => {
                                    if (val === 'id') return 12
                                    if (val === 'balloonContent') return 'Test title 01'
                                }
                            }
                        },
                        {
                            properties: {
                                get: (val) => {
                                    if (val === 'id') return 13
                                    if (val === 'balloonContent') return 'Test title 02'
                                }
                            }
                        }
                    ]
                },
            }
        },
        updStore: () => { }
    }

    const contextWrap = (component) => {
        return <ctx.Provider value={ctxValue}>
            {component}
        </ctx.Provider>
    }

    it('Should render child points', () => {
        render(contextWrap(<Points />))
        const childPoints = screen.getAllByText(/Test title/i)
        expect(childPoints.length).toEqual(2)
    })
})