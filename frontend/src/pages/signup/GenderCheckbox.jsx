import React from 'react'

function GenderCheckbox() {
    return (
        <div className='flex mt-3'>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer`}>
                    <span className='label-text'>Male</span>
                    <input type='checkbox' className='checkbox border-blue-500' />
                </label>
            </div>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer`}>
                    <span className='label-text'>Female</span>
                    <input type='checkbox' className='checkbox border-pink-500' />
                </label>
            </div>
        </div>

    )
}

export default GenderCheckbox
 