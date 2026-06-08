# AI-Powered FAQ Assistant

A full-stack AI-powered FAQ Assistant built using Next.js/React, Node.js, Express.js, MongoDB, and OpenRouter AI.

The application allows users to ask questions, receive AI-generated responses, and store conversation history for future reference.

---

## Features

- Ask questions through a chat interface
- AI-generated responses using OpenRouter
- Store conversations in MongoDB
- Retrieve previous chat history
- REST API architecture
- Error handling and validation
- Clean project structure

### Bonus Features (Planned/Implemented)

- Conversation Search
- Dark Mode
- Streaming Responses
- Docker Support

---

## Tech Stack

### Frontend

- React.js / Next.js
- Axios
- CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### AI Integration

- OpenRouter API
- Google Gemma 4 31B

---

## Project Structure

```bash
AI_Project/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   └── chat.controller.js
│   │   │
│   │   ├── middleware/
│   │   │   └── error.middleware.js
│   │   │
│   │   ├── models/
│   │   │   └── conversation.model.js
│   │   │
│   │   ├── routes/
│   │   │   └── chat.routes.js
│   │   │
│   │   ├── services/
│   │   │   └── ai.service.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── README.md
│
└── Frontend/
```

---

## API Endpoints

### Ask Question

```http
POST /api/chat
```

Request:

```json
{
  "question": "What is Node.js?"
}
```

Response:

```json
{
  "success": true,
  "conversation": {
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime..."
  }
}
```

---

### Get Conversation History

```http
GET /api/chat/history
```

Response:

```json
{
  "success": true,
  "conversations": []
}
```

---

## Database Schema

### Conversation

```js
{
  question: String,
  answer: String,
  createdAt: Date
}
```

---

## Environment Variables

Create a `.env` file inside the Backend folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

OPENROUTER_API_KEY=your_openrouter_api_key
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd Backend

npm install

npm run dev
```

Server runs on:

```text
http://localhost:5000
```

---

## Testing APIs

### Using Postman

#### POST

```http
http://localhost:5000/api/chat
```

Body:

```json
{
  "question": "Explain Node.js"
}
```

#### GET

```http
http://localhost:5000/api/chat/history
```

---

## Design Decisions

- MVC architecture for better maintainability.
- Service layer used for AI integration.
- MongoDB Atlas used as cloud database.
- OpenRouter chosen for flexible model access.
- Environment variables used for sensitive credentials.
- Conversations stored for future retrieval and search.

---

## Future Improvements

- User Authentication
- Conversation Search
- Response Streaming
- Conversation Deletion
- Docker Deployment
- Conversation Categorization

---

## Author

Anmol Garg

AI Engineer Developer Intern - Technical Assessment Project

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
