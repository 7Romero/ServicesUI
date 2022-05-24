import {OptionsObject, SnackbarMessage, VariantType} from "notistack";

type ResponseDto = {
    Status: boolean,
    Variant: "default" | "error" | "success" | "warning" | "info",
    Message: string,
    Data: any,
}

export default ResponseDto;