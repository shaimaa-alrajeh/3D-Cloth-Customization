import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import { useEffect } from 'react'
import state from '../store';

const Movable = ({ type }) => {
    const snap = useSnapshot(state);
    const initialMovable = {
        logo: false,
        text: false,
        full: false
    }

    useEffect(() => {
        console.log(type)
        if (type === 'full') {
            state.movable = { ...initialMovable, full: true }
        } else if (type === 'logo') {
            state.movable = { ...initialMovable, logo: true }
        } else if (type === 'text') {
            state.movable = { ...initialMovable, text: true }
        }
    }, [type]);

    console.log(state.movable)
    return (
        <div>

        </div>
    )
}

export default Movable