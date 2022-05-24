import * as React from 'react';

import {Box, Button} from "@mui/material";
import {Link} from "react-router-dom";

const pageStyle = {
    button: {
        p: "10px 30px",
        width: "100%",
        height: "100%",
        fontFamily: "monospace",
        textAlign: "center",
        fontSize: "20px",
        fontWeight: "600",

        color: "#fff",
        background: "#007d70",
        '&:hover': {
            background: "#004a42",
        },
    }
}

type props = {
    name: string,
    link: string
}

function BigButton(props: props) {

    return (
        <Box>
            <Button
                component={Link}
                to={props.link}
                sx={pageStyle.button}
            >
                {props.name}
            </Button>
        </Box>
    );
}

export default BigButton;