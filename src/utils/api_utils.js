import axios from 'axious';

export const getTourneyData = () => {
    return Promise.resolve(
      axios.get('https://api.start.gg/gql/alpha')  
    );
}