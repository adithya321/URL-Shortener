<h1 class="header">FreeCodeCamp API Basejump: URL Shortener Microservice</h1>      
<blockquote>
  User stories:
  <ul>1) I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.</ul>
  <ul>2) If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.</ul>
  <ul>3) When I visit that shortened URL, it will redirect me to my original link.</ul>
</blockquote>

<h3>Example usage:</h3>
<code>https://url-s-321.herokuapp.com/new/https://www.google.com</code>
<br>
<h3>Example output:</h3>
<code>
  { "original_url":"https://url-s-321.herokuapp.com/new/https://www.google.com", "short_url":"https://url-s-321.herokuapp.com/8170" }
</code>