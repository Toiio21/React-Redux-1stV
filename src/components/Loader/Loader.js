import React from 'react'

import './Loader.scss'

import {ReactComponent as LoaderIcon} from '../../images/loader.svg'

function Loader ({ style }) {
    return (
        <div style={style} className='Loader'>
            <LoaderIcon className='LoaderIcon'/>
        </div>
    )
}

export default Loader;