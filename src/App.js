import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    // if the id matches then it means it is the tour that we want to remove otherwise it would be placed in the newTours array
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }; // since both id and button are in the Tours.js that means that we should have this function access there. Therefore, we can pass it as a prop in Tours.

  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTours();
  }, []);

  if(loading){
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if(tours.length === 0){
    return <main>
      <div className='title'>
        <h2>no tours left</h2>
        {/* both the ways of onClick are correct here as we don't need to pass any argument while invoking it */}
        {/* <button onClick={() => fetchTours()}></button> */}
         {/* setting up as a reference */}
        <button className='btn' onClick={fetchTours}>refresh</button>
      </div>
    </main>
  }
  else{
    return (
      <main>
        <Tours tours = {tours} removeTour={removeTour}/>
      </main>
    );
  }
}

export default App
