import React,{Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Ranking from './Components/Ranking/Ranking';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';


const particlesOptions = {
  particles: {
    enable: true,
    type: 'inside',
    number:{
      value:80,
      density: {
        enable:true,
        value_area: 800
      }
    }
},
  opacity: {
    value: 0.5,
    random: false,
    anim: {
      enable: false,
      speed: 1,
      opacity_min: 0.1,
      sync: false
    }
  },
  line_linked:{
    enable : true,
    width:2,
    distance:25
  }
}

const initialState = {
    input : '',
    imageURL : '',
    box: {},
    route : 'signIn',
    isSignedIn : false,
    user:{
      id : '',       
      name : '',
      email : '',
      entries : 0,
      joined : '' 
    }
}
class App extends Component {
  constructor(){
      super();
      this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id : data.id,       
      name :data.name,
      email : data.email,
      entries : data.entries,
      joined : data.joined
    }
  })
}

  calculateFaceLocation = (data) => {
     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('imageFace');
     const width = Number(image.width);
     const height = Number(image.height);
     return{
       left_col: clarifaiFace.left_col * width,
       top_row : clarifaiFace.top_row * height,
       right_col : width - (clarifaiFace.right_col * width),
       bottom_row : height - (clarifaiFace.bottom_row * height)
     }
  }

  displayBoundingBox = (box) =>{
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }

  onButtonSubmit = () => {
      this.setState({imageURL : this.state.input});
      fetch('https://blooming-retreat-90583.herokuapp.com/imageUrl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch('https://blooming-retreat-90583.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  id: this.state.user.id
              })
           })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries : count }))
            })
            .catch(console.log)    
        }
        this.displayBoundingBox(this.calculateFaceLocation(response))
      
      })
      .catch(err => console.log("OOOPS!! An Error Occured :", err)
      )}
      
  
  onRouteChange = (route) => {
    if(route === 'signOut'){
      this.setState(initialState);
    }
    else if(route === 'home'){
      this.setState({isSignedIn : true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className ='particlesCss'
        params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
        { this.state.route === 'home'
          ?<div> 
              <Logo />
              <Ranking name = {this.state.user.name} entries = {this.state.user.entries}/>
              <ImageLinkForm  
                onInputChange = {this.onInputChange} 
                onButtonSubmit = {this.onButtonSubmit}
              />
              <FaceRecognition
                imageURL = {this.state.imageURL}
                box = {this.state.box}
              />
           </div> 
          : (
              this.state.route === 'register'
              ?<Register loadUser={ this.loadUser} onRouteChange = {this.onRouteChange} />
              :<SignIn loadUser={ this.loadUser} onRouteChange ={this.onRouteChange} />
            ) 
        }
      </div>
    );
  }
}

export default App;
