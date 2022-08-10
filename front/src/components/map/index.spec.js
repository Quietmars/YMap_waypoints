import React, { useState } from 'react';
import { render } from '@testing-library/react';
import { Map } from "./index"
import { ctx } from "../../store"

describe('Map', () => {

    const ctxValue = {
        store: {
            map: null,
            pointsCollection: null
        },
        updStore: () => { }
    }

    const contextWrap = (component) => {
        return <ctx.Provider value={ctxValue}>
            {component}
        </ctx.Provider>
    }

    const mockYmapReady = (readyFunction) => readyFunction()
    const mockGeoObject = jest.fn()
    const mockGeoObjectsAdd = jest.fn()
    const mockMap = jest.fn().mockReturnValue({ geoObjects: { add: mockGeoObjectsAdd } })
    const mockGeoObjectCollection = jest.fn()

    window.ymaps = {
        ready: mockYmapReady,
        GeoObject: mockGeoObject,
        Map: mockMap,
        GeoObjectCollection: mockGeoObjectCollection
    }

    afterEach(() => jest.clearAllMocks())

    it('Should call init map method', () => {
        render(contextWrap(<Map />))
        expect(mockMap).toHaveBeenCalledTimes(1) //init map
    })

    it('Should call create points method', () => {
        render(contextWrap(<Map />))
        expect(mockGeoObjectCollection).toHaveBeenCalledTimes(1) //create points collection
    })

    it('Should call create polyline method', () => {
        render(contextWrap(<Map />))
        expect(mockGeoObject).toHaveBeenCalledTimes(1) // create polyline
    })

    it('Should add polyline and points to map', () => {
        render(contextWrap(<Map />))
        expect(mockGeoObjectsAdd).toHaveBeenCalledTimes(2) // add polyline and points to map
    })

})