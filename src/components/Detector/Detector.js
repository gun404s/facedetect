import React from "react";
import './Detector.css';
import Imgbox from './Imgbox/Imgbox';

class Detector extends React.Component {
 constructor(props){
    super(props);

    this.state = {
        input :'',
        ImgSrc:'',
        box:[]
    }
   
 }

    onInputChange = (event) =>{
        this.setState({input:event.target.value});
    }

    onImgSubmit = () =>{
        
        this.setState({ImgSrc:this.state.input});
        
        const input = this.state.input;
        // hna khtarina this.state.input wmachi IMGsrc 7it state ghaykon khawi 7ta katrendra lfucn kamla 
        // so drna input hit state dyalha deja trandra 
      
     
        // add to url db :
        this.addToUrl(input);

        
        // detect api fetch
        fetch('https://facedetectapi-0667bec6ffc0.herokuapp.com/detect',{
            method : 'post',
            headers:{'Content-Type' :'application/json'},
            body:JSON.stringify({

                input: input

            })
        })
      .then(Response => Response.json())
      .then(data =>{
        
        // hna ndiro fun li trdlina rounding box
        // w najoutew l udates f db 
        this.getJsonInfo(data);
    


      })

      .catch(error=>console.log('fer',error));

     
    }

    getJsonInfo = (resultt) =>{
        const regions = resultt.outputs[0].data.regions;

        const facesArray = [];
         
         //do DOM manipulation and css to put box in faces : 
         const image = document.getElementById('inputimage');
         const width = Number(image.width)//convert string to number
         const height = Number(image.height);

        regions.forEach(region => {
       
        const boundingBox = region.region_info.bounding_box;

        const topRow = boundingBox.top_row.toFixed(3);
        const leftCol = boundingBox.left_col.toFixed(3);
        const bottomRow = boundingBox.bottom_row.toFixed(3);
        const rightCol = boundingBox.right_col.toFixed(3);
        
    
       
        
        // now we gonna calcul the box position and put it to box object that we declare in the construction
        facesArray.push({
        left:leftCol*width,
        top:topRow*height,
        right : width - (rightCol*width),
        bottom:height - (bottomRow*height)
        });

        });

        
        this.setState({box:facesArray})


        if(facesArray.length>0){
                    //update entries 
             let newEntries = Number(this.props.entries);
             this.props.onEntriesChange(newEntries+1);
            
                     // update database user entries  
                     fetch('https://facedetectapi-0667bec6ffc0.herokuapp.com/updatentries',{
                        method : 'put',
                        headers:{'Content-Type' :'application/json'},
                        body:JSON.stringify({
                    
                            id : this.props.id
                        })
                    })
                  .then(Response => Response.json())
                  .then(msg =>{
                        console.log(msg);
                  }).catch(error => console.log(error));
            
                  
        }
       

        


        

    }


    addToUrl =(url)=>{
      

        fetch('https://facedetectapi-0667bec6ffc0.herokuapp.com/urls',{
                        method : 'post',
                        headers:{'Content-Type' :'application/json'},
                        body:JSON.stringify({
                    
                            url : this.state.input,
                            id: this.props.id

                        })
                    })
                  .then(Response => Response.json())
                  .then(msg =>{
                        console.log(msg);
                  }).catch(error =>{
                     console.log(error);
                  } );
  
  
                }
       

    render(){
        const {name,entries} = this.props;

        return (
            <div>
              <div className="d-flex flex-column align-items-center p-4">
                <div className="text-center mb-4">
                  <h3 className="text-white">{`${name}, your current entry count is...`}</h3>
                  <h1 className="text-white">{`#${entries}`}</h1>
                  <p className="fs-3">
                    {'This Magic Brain will detect faces in your pictures. Give it a try.'}
                  </p>
                </div>
          
                <div className="form-group w-100 text-center mb-5 p-4 rounded shadow-lg bg-light" style={{ maxWidth: '700px' }}>
                  <input
                    className="form-control form-control-lg mb-3"
                    type="text"
                    placeholder="Put your image URL here!"
                    onChange={this.onInputChange}
                  />
                  <button
                    className="btn btn-lg btn-primary w-100"
                    onClick={this.onImgSubmit}
                  >
                    Detect
                  </button>
                </div>
              </div>
          
              <div className="text-center">
                <Imgbox input={this.state.ImgSrc} box={this.state.box} />
              </div>
            </div>
          );
          
    }
}

export default Detector;