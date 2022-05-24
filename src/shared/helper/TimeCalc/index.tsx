export default function timeCalc(data: Date): string {
    const difference = new Date().getTime() - data.getTime();

    let result = "";

    if(difference >= 1000 * 60 * 60 * 24 * 365)
    {
        result = Math.round(difference / (1000 * 60 * 60 * 24 * 365)).toString();
        result += result === "1" ? " year" : " years";
    }
    else if(difference >= 1000 * 60 * 60 * 24 * 30)
    {
        result = Math.round(difference / (1000 * 60 * 60 * 24 * 30)).toString();
        result += result === "1" ? " month" : " months";
    }
    else if(difference >= 1000 * 60 * 60 * 24)
    {
        result = Math.round(difference / (1000 * 60 * 60 * 24)).toString();
        result += result === "1" ? " day" : " days";
    }
    else if(difference >= 1000 * 60 * 60)
    {
        result = Math.round(difference / (1000 * 60 * 60)).toString();
        result += result === "1" ? " hour" : " hours";
    }
    else if(difference >= 1000 * 60)
    {
        result = Math.round(difference / (1000 * 60)).toString();
        result += result === "1" ? " minute" : " minute";
    }

    return result;
}