import React from "react";
import PopupBoxProps from "../Interfaces/PopupBoxProps"
import { Button, Typography, Modal, Divider } from '@material-ui/core';
import "../Styles/PopupBox.css"
import { Link } from "react-router-dom";

export default function PopupBox({
    title,
    message,
    open,
    onCloseClick,
    redirectTo
}: PopupBoxProps) {
    return (

        <Modal 
            open = {!!open}
        >
            <div className="PopupBox">

                {
                    title && (
                        <Typography variant = "h6">
                            {title}
                        </Typography>
                    )
                }

                <Divider />
                <br />

                {
                    message && (
                        <Typography variant = "body1">
                            {message}
                        </Typography>
                    )
                }
                
                <br />
                <br />
                
                {
                    onCloseClick && (
                        redirectTo !== undefined ? (
                            <Link to = {redirectTo}>
                                <Button fullWidth variant = "outlined" onClick = {onCloseClick} >
                                    Close
                                </Button>
                            </Link>
                        ) : (
                            <Button fullWidth variant = "outlined" onClick = {onCloseClick} >
                                Close
                            </Button>
                        )    
                    )
                }

                <br />
            </div>

        </Modal>

    )
}