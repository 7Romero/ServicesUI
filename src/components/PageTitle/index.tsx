import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import * as React from "react";


type props = {
    name: string;
}

export default function PageTitle(props: props) {

    return(
        <Container maxWidth="xl">
            <Typography
                variant="h4"
            >
                {props.name}
            </Typography>
        </Container>
    );
}
