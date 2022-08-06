import React from "react";

export const initialState = {
    points: {
        items: {
            1: {
                id: 1,
                title: 'Test 1',
                coordinates: {}
            },
            2: {
                id: 2,
                title: 'Test 2',
                coordinates: {}
            }
        },
        list: [1, 2]
    },
    map: null,
}

export const ctx = React.createContext(null);