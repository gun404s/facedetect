import React from "react";
import './about.css'

class About extends React.Component {


    render(){
        return(
                <div className="center">
                    <div className="about-container">
                    <h1>About Face Detection App</h1>
                    
                    <p>Welcome to our Face Detection App, where technology meets innovation! This web app is designed to make face detection simple, efficient, and accessible to everyone.</p>
                    <br/><br/>
                    <h2>Key Features:</h2><br/>
                    <ul style={{textAlign:"left"}}>
                        <li><strong>User-Friendly Interface:</strong> Easily upload images and detect faces in real time.</li>
                        <li><strong>Leaderboard:</strong> Compete with other users by submitting more images and see where you stand on the leaderboard.</li>
                        <li><strong>Privacy First:</strong> Your data and images are secure and used only for face detection purposes.</li>
                        <li><strong>Advanced Technology:</strong> Leveraging powerful APIs to detect faces with high accuracy.</li>
                    </ul>
                    <br/><br/>
                    <h2>Why Face Detection?</h2><br/>
                    <p>Face detection technology has become a critical tool in fields like security, healthcare, and social media. By learning about face detection, you’re engaging with one of the most exciting areas of artificial intelligence and machine learning.</p>
                    </div>

                </div>
        );
    }
}
export default About;