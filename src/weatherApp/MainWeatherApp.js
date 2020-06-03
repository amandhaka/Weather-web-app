import React,{useState} from 'react';
import {Input,InputGroupAddon,InputGroupText,InputGroup,Card,CardBody,CardTitle,Badge} from 'reactstrap';
import axios from 'axios';
const api={
    key:"ab26c70954104259913d70de08071b7f",
    base:"https://api.openweathermap.org/data/2.5/"
}
const WeatherApp = () => {
    const[query,setQuery]=useState('');
    const[temp,setTemp]=useState('');
    const[display,setDisplay]=useState(false);
    const[country,setCountry]=useState('');
    const[city,setCity]=useState('');
    const[weather,setWeather]=useState('');
    const search=(event)=>{
        if(event.key==="Enter"){
            axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res=>{
                console.log(res.data);
                setWeather(res.data.weather[0].main)
                setTemp(res.data.main.temp);
                setCountry(res.data.sys.country);
                setCity(res.data.name);
                setDisplay(true);
                setQuery('');
            })
            .catch((error)=>{
                console.log(error,"Couldn't fetch data");
            })
        }
    }

    const dateBuilder=(d)=>{
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day=days[d.getDay()];
        const date=d.getDate();
        const month=months[d.getMonth()];
        const year=d.getFullYear();
        return `${day}, ${date}-${month}-${year}`;
    }
    const styleCard={
        backgroundColor:"rgba(245, 245, 245, 1)",
        opacity:".5",
        padding:"5px",
        height:"50vh",
        width:"80vw",
        position:"absolute",
        left:"50%",
        top:"40%",
        transform:"translate(-50%,-50%)",
        borderRadius:"30px",
        boxShadow:"5px 5px rgba(0,0,23,0.2)"
    }
    const styleText={
        //position:"absolute",
        position:"relative",
        fontSize:"95px",
        textAlign:"center",
        //left:"20%",
        //top:"5%",
        color:"#FBFDFF",
        //transform:"translate(-30%,-10%)",
        textShadow:" 4px 4px rgba(75,75,75,200)", 
    }
    const styleCity={
        fontStyle:"bold",
        fontWeight:"600",
        padding:"10px",
        fontFamily: "Open Sans Condensed, sans-serif",
        color:"#050606",
        textShadow:"1px 1px rgba(0,2,2,0.4)",
    }
    return ( 
        <div className={(temp<20)?'container':'container warm'}>
            <section>
            <InputGroup className="search-box">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>City</InputGroupText>
                </InputGroupAddon>
                <Input 
                type="text"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                onKeyPress={search}
                placeholder="Search..."/>
            </InputGroup>
            { display ? 
                <div>
                    <Card style={styleCard}>
                        <CardTitle>
                            <h1 style={styleCity}>{city},{country}</h1>
                            <h5 style={styleCity}>{dateBuilder(new Date())}</h5>
                        </CardTitle>
                        <CardBody>
                             <h1 style={styleText}>{Math.round(temp)}°C</h1>
                        </CardBody>
                    </Card>
                    <h2 style={{position:"absolute",color:"#fff",left:"50%",top:"70%",transform:"translate(-50%,-60%)",fontFamily: "Indie Flower, cursive"}}>{weather}</h2>
                </div>
            : ''}
            </section>
        </div>
     )
}
 
export default WeatherApp;