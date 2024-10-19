import React from "react";
import './Imgbox.css';

class Imgbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { input, box } = this.props;
  
    return (
      <div className='centerimg'>
        <div className='image-container'>
          <img id='inputimage' alt='' src={input} width='500px' height='auto' />
  
          {/* Check if the box array has elements before mapping */}
          {box.length > 0 &&
            box.map((boundingBox, index) => (
              <div
                key={index}
                className='bounding-box'
                style={{
                  position: 'absolute', // Keep bounding box absolute
                  top: boundingBox.top,
                  right: boundingBox.right,
                  bottom: boundingBox.bottom,
                  left: boundingBox.left,
                }}
              ></div>
            ))}
        </div>
  
      
      </div>
    );
  }
  
}

export default Imgbox;
