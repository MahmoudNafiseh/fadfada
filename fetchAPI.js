export async function fetchAPI(setPost) {
   const response = await fetch('http://10.0.2.2:3000/Post').then((res) =>
      res.json()
   );
   setPost(response);
}
