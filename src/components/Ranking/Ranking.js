import React from "react";
import './ranking.css'

class Ranking extends React.Component{
    
        constructor(props){
            super(props)
            this.state = {
                leader :[]
            }
        }

        leaderboard = () =>{
            fetch('http://localhost:3001/toptable',{
                method : 'get',
                headers:{'Content-Type' :'application/json'},
              
            })
            .then(response => response.json())
            .then (data =>{
                if (Array.isArray(data)) {  // Ensure the data is an array
                    this.setState({leader:data});
                    }
            })
            .catch(err => console.log('errrr',err));
        }


        componentDidMount() {
            this.leaderboard();  // Fetch leaderboard data when component mounts
        }


    render(){
            const topten = this.state.leader;
            return (
                <div>
                    <div className="title">
                        <h1>Top 10 Face Detection Contributors</h1>
                        <p>
                            Welcome to the leaderboard! Here are the users who have
                            submitted the most images for face detection. Check out the top contributors and see how you compare:
                        </p>
                    </div>
    
                   {/* Ensure topten is an array before using map */}
                {Array.isArray(topten) && topten.length > 0 &&
                        topten.map((values, index) => (
                            <div className="leader-item" key={index}>
                            <span className="rank">#{index + 1}</span>
                            <span className="username">{values.username}</span>
                            <span className="total">{`Faces detected: ${values.total_urls}`}</span>
                        </div>
                        ))
                    }
    
                    {/* Message when no leaderboard data is available */}
                    {topten.length === 0 && (
                        <div>
                            <p>No leaderboard data available</p>
                        </div>
                    )}
                </div>
            );
    }
}
export default Ranking;