import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TetrisBlock from './TetrisBlock.js';

import Settings from '../../settings'

function BlocksGroup({blocks, scale}) {

    return (
        <>
            {
                blocks.map(({position, color}) => <TetrisBlock
                    key={ position.y * Settings.stageSize.width + position.x }
                    position={position}
                    color={color}
                    scale={scale}
                />)
            }
        </>
    )
}

BlocksGroup.propTypes = {
    blocks : PropTypes.array,
    scale: PropTypes.number
}

BlocksGroup.defaultProps = {
    blocks : [],
    scale: 1
}

export default memo(BlocksGroup);