import React from 'react';
import { getRealSize, addPx } from '../../../settings';

const withLogicSize = (width, height) => (Component) => {

    const size = {
        width: addPx(getRealSize(width)),
        height: addPx(getRealSize(height))
    }

    return (props) => (
        <Component {...props} size={size} />
    )
}

export default withLogicSize