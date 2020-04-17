const middleware = (store) => (next) => (action) => {
  
  next(action);

  // // POUR EXEMPLE: Requetes avec Axios
  // // Je dois réagir uniquement à certains types d'action
  // switch (action.type) {
  //   case FETCH_QQCHOSE:
  //     axios.get(url)
  //       .then(response => {
  //         // Ici tu sais que tu as obtenu avec succès ta réponse
  //         // Tu peux la récupérer dans response.data
  //         const { data } = response.
  //         // Il faut ensuite informer le reducer des nouvelles données reçues
  //         store.dispatch(receivedQqchose(data));
  //       })
  //       .catch()
  //   default:
  //      next(action);
  // }
};

export default middleware;