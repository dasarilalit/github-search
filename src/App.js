import React, { useState ,useEffect} from 'react';
import {Form,Card,Image,Icon} from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [name,setName]=useState('');
  const [userName,setUserName]=useState('');
  const [followers,setFollowers]=useState('');
  const [following,setFollowing]=useState('');
  const[repos,setRepos]=useState('');
  const [avatar,setAvatar]=useState('');
  const [userInput,setUserInput]=useState('');
  const [error,setError]=useState('User Not Found');


useEffect(() =>{
fetch("https://api.github.com/users/example")
        .then(res =>res.json())
        .then(data =>{
          setData(data)
        
        });
}, []);

const setData =({name,login,followers,following,public_repos,avatar_url}) =>{
setName(name)
setUserName(login);
setFollowers(followers);
setFollowing(following);
setRepos(public_repos);
setAvatar(avatar_url);
};


const handleSearch =(e) =>{
setUserInput(e.target.value)
}

const handleSubmit =(e) =>{
  fetch(`https://api.github.com/users/${userInput}`)
  .then(res =>res.json())
  .then(data =>{
    if(data.message){
      setError(data.message)
    }
    else{
      setData(data);
      setError(null);
    }
 
 })
}

  return (
    <div>
    <div className="nav">
      <hl>Github Search<Icon name='github' size='large'  /></hl></div>

      <div className="search">
        <Form  onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='GitHub User' onChange={handleSearch}  />
              <Form.Button content='Search'/>
              <Form.Button content='Add' />
              <Form.Button content='Compare' /> 
             </Form.Group>
        </Form>
        </div>
           
           {error ? (
           <h1>{error}</h1>
           ):(
             <div className="Card">
             <Card>
           <Image src={avatar}
            wrapped ui={false} />
         <Card.Content>
           <Card.Header>{name}</Card.Header>
           <Card.Header>{userName}</Card.Header>
           
         </Card.Content>
         <Card.Content extra>
           <a>
             <Icon name='user' />
             {followers} followers
           </a>
         </Card.Content>
         <Card.Content extra>
           <a>
             <Icon name='user' />
             {repos} Repos
           </a>
         </Card.Content>
         <Card.Content extra>
           <a>
             <Icon name='user' />
             {following} following
           </a>
         </Card.Content>
         </Card>
        </div>
           )}

      
 </div>
  );
}

export default App;
