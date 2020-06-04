import React,{useState} from 'react';
import {Input,InputGroupAddon,InputGroupText,InputGroup,Card,UncontrolledAlert} from 'reactstrap';
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
    const [visible, setVisible] = useState(true);
    const[error,setError]=useState('');
    const search=(event)=>{
        if(event.key==="Enter"){
            axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res=>{
                console.log(res.data);
                setVisible(false);
                setWeather(res.data.weather[0].main)
                setTemp(res.data.main.temp);
                setCountry(res.data.sys.country);
                setCity(res.data.name);
                setDisplay(true);
                setError('');
                setQuery('');
            })
            .catch((error)=>{
                console.log(error,"Couldn't fetch data");
                setWeather('')
                setTemp('');
                setCountry('');
                setCity('');
                setDisplay(false);
                setError('');
                setQuery('');
                setVisible(false);
                setError("Enter a valid city name");
            })
        }
    }
    const onDismiss = () => setVisible(false);
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
        padding:"2px",
        height:"30vh",
        width:"50vw",
        position:"absolute",
        left:"50%",
        top:"60%",
        justifyContent:"center",
        transform:"translate(-50%,-70%)",
        borderRadius:"30px",
        boxShadow:"5px 5px rgba(0,0,23,0.2)"
    }
    const styleText={
        position:"relative",
        fontSize:"80px",
        color:"#FBFDFF",
        textAlign:"center",
        textShadow:" 4px 4px rgba(75,75,75,200)", 
    }
    const styleCity={
        fontStyle:"bold",
        fontFamily: "Open Sans Condensed, sans-serif",
        color:"#050606",
        textShadow:"1px 1px rgba(0,2,2,0.4)",
    }
    const styleAlert={
        top:"20%",
        position:"absolute",
        left:"50%",
        transform:"translate(-60%,-80%)",
        borderRadius:"30px",
    }
    return ( 
        <div className={(temp<20)?'app':'app-warm'}>
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
            <p style={{color:"red"}}>{error}</p>
            { display ? 
                <div>
                    <div className="location">
                        <h2 style={styleCity}>{city},{country}</h2>
                        <h5 style={styleCity}>{dateBuilder(new Date())}</h5>
                    </div>
                    <Card style={styleCard}>
                        <h1 style={styleText}>{Math.round(temp)}°C</h1>
                    </Card>
                    <h5 style={styleCity,{position:"absolute",color:"#fff",top:"65%",left:"50%",transform:"translate(-50%,-50%)"}}>{weather}</h5>
                </div>
            :
            <div>
                <UncontrolledAlert color="info" style={styleAlert} isOpen={visible} fade={true} toggle={onDismiss}>
                    Enter the city name
                </UncontrolledAlert>
            </div>
            }
            </section>
        </div>
        </div>
     )
}
 
export default WeatherApp;