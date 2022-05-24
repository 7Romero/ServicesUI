import api from "../shared/api";
import ResponseDto from "../entities/Response/ResponseDto";

const SectionServices = {
    GetAll: async () => {
        const responseFormat: ResponseDto = {
            Status: false,
            Variant: "default",
            Message: "",
            Data: null,
        }

        await api.section.getAll()
            .then(function (response) {
                responseFormat.Status = true;
                responseFormat.Data = response.data;
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    responseFormat.Status = false;
                    responseFormat.Variant = "error"
                    responseFormat.Message = error.response.data.errorText;
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return responseFormat;
    },

}

export  default SectionServices;