import React from 'react'
import { connect } from 'react-redux'
import BlocksGroup from './BlocksGroup'
import Settings from '../../settings'

const NextFigure = ({blocks}) => {

    const maxPoint = {
        x: Settings.stageSize.width,
        y: Settings.stageSize.height
    }

    const topLeft = blocks.reduce((acc, {x, y}) => ({
        x: Math.min(acc.x, x),
        y : Math.min(acc.y, y)
    }), maxPoint)

    const centeredColoredBlocks = blocks.map(({x, y}) =>  ({
        position: {
            x: x - topLeft.x,
            y: y - topLeft.y
        },
        color: '#000000'
    }));

    return (
        <div className='Small-stage'>
            <BlocksGroup
                blocks= {centeredColoredBlocks}
                scale = {0.3}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({blocks: state.nextFigure})

export default connect(mapStateToProps)(NextFigure)