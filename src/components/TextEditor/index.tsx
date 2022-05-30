import {Editor} from "@tinymce/tinymce-react";
import * as React from "react";
import {useEffect, useState} from "react";

type Props = {
    setValue: (name: any, value: string) => void,
    name: string,
    initialValue: string | undefined,
}

export default function (props: Props){

    const [defaultValue, setDefaultValue] = useState<string>("");

    useEffect(() => {
        if(props.initialValue){
            setDefaultValue(props.initialValue);
            props.setValue(props.name, props.initialValue);
        }
    }, [])

    return(
        <Editor
            apiKey='6oc3r05r3p9uc7fl2xpigzs1rx0lta4bp0unuk6w9b2ooku5'
            initialValue={props.initialValue ? (props.initialValue) : ("") }
            onEditorChange={(e) => props.setValue(props.name, e)}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    "a11ychecker",
                    "advlist",
                    "advcode",
                    "advtable",
                    "autolink",
                    "export",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "powerpaste",
                    "fullscreen",
                    "formatpainter",
                    "insertdatetime",
                    "media",
                    "table",
                    "help",
                    "wordcount"
                ],
                toolbar:
                    "undo redo | casechange blocks | bold italic backcolor | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist | outdent indent | removeformat help",
                content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
        />
    );
}