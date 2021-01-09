import React from 'react'

import {connect} from 'react-redux'

const ScoreView = ({score}) => (
    <div className='Score-view'>
        <h1>Score: {score}</h1>
    </div>
)

const mapStateToProps = ({score}) => ({score})

export default connect(mapStateToProps)(ScoreView)