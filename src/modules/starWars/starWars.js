import { Avatar, List, ListItem, ListItemAvatar, ListItemText, makeStyles, TextField, Typography } from "@material-ui/core";
import { Person, Work, AccessTime } from "@material-ui/icons"
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { httpClient } from "../../shared/http";

export default function StarWars() {

    const styles = useStyles();
    const [starWarsCharacters, setStarWarsCharacters] = useState([]);
    const [inputValue, setInputValue] = useState('')
    const [chosenCharacter, setChosenCharacter] = useState(null)

    useEffect(() => {
        let endpoint = `https://swapi.dev/api/people/`;
        if (inputValue) {
            endpoint += `?search=${inputValue}`
        }
        httpClient.get(endpoint).then(res => {
            setStarWarsCharacters(res.data.results)
        })
    }, [inputValue]);


    const characterList =
        Object.keys(chosenCharacter ? chosenCharacter : {}).map((spec, index) => {
            return (<ListItem className={styles.listItem} key={index}>
                <ListItemAvatar>
                    <Avatar>
                        {index % 2 ? <Work /> : index % 3 ? <AccessTime /> : <Person />}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={spec} secondary={
                    <Typography component={'span'} variant={'body2'}>

                        {Array.isArray(chosenCharacter[spec]) ?
                            <div style={{ 'display': 'grid' }}>
                                {
                                    chosenCharacter[spec].map((d, index) => {
                                        return <a style={{ color: '#2b97dc' }} key={index} href={d}>{d}</a>
                                    })
                                }
                            </div>
                            : chosenCharacter[spec].includes('https://')? <a style={{ color: '#2b97dc' }} href={chosenCharacter[spec]}>{chosenCharacter[spec]}</a>:chosenCharacter[spec]}
                    </Typography>
                } />
            </ListItem>)
        })





    return (
        <div className={styles.starwarsComponent}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={starWarsCharacters}
                getOptionLabel={(option) => option.name}
                sx={{ width: 300 }}
                // getOptionSelected={(option, value) => { if (option) return option.id === value.id }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                value={chosenCharacter}
                onChange={(event, newValue) => {
                    setChosenCharacter(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Star Wars Characters" />}
            />
            <List className={styles.list} sx={{ width: '50%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {characterList}
            </List>
        </div>
    )
}

const useStyles = makeStyles({
    starwarsComponent: {
        padding: '20px'
    },
    list: {
        width: '50%'
    }
});