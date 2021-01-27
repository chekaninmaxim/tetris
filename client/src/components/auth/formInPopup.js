import React, { useState } from 'react'
import { Popup } from 'semantic-ui-react'

export default (FormComponent) => ({trigger, onClose}) => { 
    const [open, setOpen] = useState(false)

    const closePopup = () => {
        onClose();
        setOpen(false);
    }

    return (
        <Popup
            content={
                <FormComponent closePopup={closePopup}/>
            }
            on='click'
            trigger={trigger}
            onClose={closePopup}
            open={open}
            onOpen={() => setOpen(true)}
        />
    )
} 