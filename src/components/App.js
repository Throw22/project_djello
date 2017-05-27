import React from 'react';
import Search from './Search';

const App = (
  {
    isFetching,
    city,
    min_temp,
    max_temp,
    the_temp,
    weather_state_abbr,
    onSearch
  }
) => {
  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        {`Today's weather for ${city}`}
      </div>
      <div>
        Current Temperature: {the_temp}
      </div>
      <div>
        Minimum Temperature: {min_temp}
      </div>
      <div>
        Maximum Temperature: {max_temp}
      </div>
      <Search onSearch={onSearch} />
    </div>
  );
};

export default App;
