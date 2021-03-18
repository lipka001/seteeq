import React from 'react';
import Button from '@material-ui/core/Button';
import icon from '../img/icon.png'

export default function ClearButton({setSelected, defaultValues}) {

    
    const handleClear = () => {
        setSelected(defaultValues);
    }

    return (
        <Button className="reset-btn"
            disableElevation
            onClick={handleClear}>
            <img src={icon} alt="Icon"></img>
        </Button>
    )
}