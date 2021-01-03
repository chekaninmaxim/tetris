import React from 'react';
import PropTypes from 'prop-types';
import TetrisBlock from './TetrisBlock.js';

import Settings from '../settings'

function BlocksGroup({blocks}) {
    return (
        <>
        { blocks.map(({position, color}, i) =>
            <TetrisBlock
                key={ position.y * Settings.stageSize.width + position.x }
                position={position}
                color={color} 
            />) }
        </>
    )
}

BlocksGroup.propTypes = {
    blocks : PropTypes.array
}

BlocksGroup.defaultProps = {
    blocks : []
}

export default BlocksGroup;