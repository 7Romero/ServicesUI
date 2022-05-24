import * as React from 'react';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Box, Button} from "@mui/material";
import SectionServices from "../../../services/SectionServices";
import {useCallback, useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import SectionDto from "../../../entities/Section/SectionDto";
import usePaginate from "../../../shared/hooks/UsePaginate";
import {FilterType} from "../../../shared/contexts/PaginateContext";

const pageStyle = {

}

function NavBar() {
    const [sections, setSections] = useState<SectionDto[]>([]);
    const [isSectionsOpen, setIsSectionsOpen] = useState<boolean[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const paginate = usePaginate();

    const {enqueueSnackbar} = useSnackbar();

    const handlerClickCategory = (id: string) =>{
        const requestFilters: FilterType = {
            logicalOperator: 0,
            filters: [
                {
                    comparisonOperators: 2,
                    path: "CategoryId",
                    value: id
                }
            ]
        }

        paginate.setRequestFilters(requestFilters);
    }

    const fetchData = useCallback(async () => {
        const response = await SectionServices.GetAll();

        if (response.Status) {
            setSections(response.Data);
        } else {
            enqueueSnackbar(response.Message, {
                    variant: response.Variant
                }
            );
        }

    }, [])

    useEffect(() => {
        fetchData()

    }, [fetchData])

    return (
        <>
        <List>
            <ListItemButton onClick={() => {setIsOpen(!isOpen)}}>
                <ListItemText primary="All open orders" />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {sections &&
                        sections.map((section, index)=>{
                            const handleClick = () => {
                                const sectionsOpen = [...isSectionsOpen];

                                sectionsOpen[index] = !sectionsOpen[index];

                                setIsSectionsOpen(sectionsOpen);
                            }

                            return(
                                <Box key={section.id}>
                                    <ListItemButton onClick={handleClick}>
                                        <ListItemText primary={section.name} />
                                        {isSectionsOpen[index] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={isSectionsOpen[index]} timeout="auto" unmountOnExit>

                                        {section.category.map((category) => {
                                            return (
                                                <List key={category.id} component="div" disablePadding>
                                                    <ListItemButton onClick={()=>{handlerClickCategory(category.id)}} sx={{ pl: 4 }}>
                                                        <ListItemText primary={category.name} />
                                                    </ListItemButton>
                                                </List>
                                            );
                                        })
                                        }
                                    </Collapse>
                                </Box>
                            );
                        })
                    }
                </List>
            </Collapse>
            </List>
        </>
    );
}

export default NavBar;