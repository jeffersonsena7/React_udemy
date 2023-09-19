export const loadPosts = async () => {
  //fetch é da API nao tem nada aver com o react e sim com javascript
  const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
  const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')
  //passando uma array de promessa
  const [posts, photos] = await Promise.all([postsResponse, photosResponse]);
  //convertendo para JSON
  const postsJson = await posts.json();
  const photosJson = await photos.json();

  //para cada post pegar uma foto
  const postsAndPhotos = postsJson.map((post, index) => {
    return { ...post, cover: photosJson[index].url }
  });
  return postsAndPhotos
};