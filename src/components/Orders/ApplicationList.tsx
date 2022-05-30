import {Box, Card, Container, Divider, InputAdornment, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import OrderCreateDto from "../../entities/Order/OrderCreateDto";
import OrderServices from "../../services/OrderServices";
import {useSnackbar} from "notistack";
import ApplicationDto from "../../entities/Application/ApplicationDto";
import ApplicationServices from "../../services/ApplicationServices";
import UserInfo from "../User/UserInfo";
import {useCallback, useEffect, useState} from "react";
import BigButton from "../BigButton";
import AppointFreelancerDto from "../../entities/Order/AppointFreelancerDto";

type Props = {
    id: string
}

export default function ApplicationList(props: Props) {

    const {enqueueSnackbar} = useSnackbar();

    const [applications, setApplications] = useState<ApplicationDto[]>()

    const AppointFreelancer = async (application: ApplicationDto) => {
        let data: AppointFreelancerDto = {
            orderId: application.orderId,
            freelancerId: application.user.id
        }

        const response = await OrderServices.AppointFreelancer(data);

        if (!response.Status) {
            enqueueSnackbar(response.Message, {
                variant: response.Variant
            });

            return;
        }

        enqueueSnackbar("Freelancer has been successfully selected", {
            variant: "success"
        });
    }

    const fetchData = useCallback(async () => {
        const response = await ApplicationServices.GetApplicationsForOrder(props.id);

        if (!response.Status) {
            return;
        }

        setApplications(response.Data);
    }, []);

    useEffect(() => {
        fetchData()

    }, [fetchData])

    return (
        <>
            <Card
                sx={{
                    p: "30px",
                    mb: 2,
                }}
            >
                <Typography variant="h5">
                    List of freelancers:
                </Typography>
            </Card>
            {applications && applications.length > 0 ? (
                <>
                    {applications.map((application,index) => (
                        <Card
                            key = {index}
                            sx={{
                                p: "30px",
                                mb: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <UserInfo user={application.user}/>
                                <Box
                                    onClick={async () => await AppointFreelancer(application)}
                                >
                                    <BigButton name={"Offer an order"} link={"/"}/>
                                </Box>
                            </Box>

                            <Typography variant="h6"
                                sx={{
                                    mt: 2,
                                }}
                            >
                                I'm ready to do it for {application.suggestedPrice}$
                            </Typography>
                            <Typography variant="h6">
                                I need {application.suggestedTime} days
                            </Typography>
                            <Typography variant="h6">
                                About me:
                            </Typography>
                            <Box
                                sx={{
                                    wordWrap: "break-word",
                                }}
                                dangerouslySetInnerHTML={{__html: application.description}}
                            />
                        </Card>
                    ))}
                </>
            ):(
                <Card
                    sx={{
                        p: "30px",
                        mb: 2,
                    }}
                >
                    <Typography variant="subtitle1">
                        No one has responded to your application yet
                    </Typography>
                </Card>
            )}
        </>
    );
}
