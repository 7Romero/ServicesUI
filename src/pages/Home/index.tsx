import {Container, Grid, Typography} from "@mui/material";

export default function Home() {

    return (
        <Container maxWidth="sm">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom>
                        Homepage
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        This is demo app with login, registration and updating profile
                        flows.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}