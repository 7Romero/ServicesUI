type SectionDto = {
    id: string;
    name: string;
    category: [{
        id: string,
        name: string,
    }]
}

export default SectionDto;