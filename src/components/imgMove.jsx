import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store';

const imgMove = () => {
    const snap = useSnapshot(state);
    const initialMovable = {
        logo: false,
        text: false,
        full: false
    }
    return (
        <div className="absolute left-full ml-3" onClick={snap.movable = {
            ...initialMovable,
            logo:true,
        }}>
            <h1>{snap.movable}</h1>
        </div>
    )
}

export default imgMove