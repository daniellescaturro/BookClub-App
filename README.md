# bookClub App
This app provides a place for readers to track the books they've read and their ratings and comments on those books. Other users can comment on books creating an online book club discussion environment.

### To access the Game
  * https://book-club-ds.herokuapp.com/bookclub

### Wireframes
  * https://git.generalassemb.ly/dscaturro/project-2/blob/master/Wireframe1.JPG
  * https://git.generalassemb.ly/dscaturro/project-2/blob/master/Wireframe2.JPG

### User Story
 * To use the app, the user accesses it from their browser at the above link, which will open to the homepage.
 * A new user will need to register through the Sign Up link in the navigation bar. And, after that, he/she/they will need to Log In upon each use. 
 * From the homepage a user can navigate to My Library or Add New Book.
 * The Add New Book page requires entry of a book cover image url, title, author and synopsis. Once the data is entered, then click Add Book button at bottom of page. 
 * Once a book is entered, the book cover will display on the My Library page and the detail can be accessed by clicking on the book cover. 
 * On the book detail page, the user can access links for Edit Book and Delete Book. He/she/they can also Add New Comment, which entails a rating (1-5) and text for comments.
 * Once a comment is entered that comment will display on the book detail page and can be edited or deleted through their respective links.
 * Multiple users can comment on books.

### Technical Specifications
This game was created using Node.js, Mongoose, Express, Embedded JavaScript, HTML, Bootstrap, and CSS. It is deployed on Heroku, operates through the browser and requires no installation. 

### Challenges & Potential Forthcoming Features
 * The biggest challenge I had was creating the comment feature on the books, which is a one-to-many relationship. Instead of creating a separate model and controller, I included both threads in the books model and controller files making comments an array within the book schema. I had a hard time getting the routing to go to the comments forms, rather than the book forms. Additionally, I wanted to show the book cover on the comment forms and it was challenging to link that up properly. 
 * Additional work:
   * I would like to populate the library using AJAX/API and then enable users to search the library and populate their personal libraries from the larger library so they don't have to enter the book information.
   * I would also like to do a lot more on the styling front including, the navigation bar, buttons/links, ratings and images. I'd like to use clickable stars for the rating rather than the numerical 1-5 I currently have. The comments need to identify the user. The layout of the show page needs to be improved.  The form pages are bland and could use more styling. The comments presentation needs work. Also, the images in the app are too big and I had to find similarly sized photos to include and had a lot of difficulty with size and alignment. I'd like for there to be smaller thumbnail size imgages on the My Library page and slightly bigger images on the book show page and edit forms.  
