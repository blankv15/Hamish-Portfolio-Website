export const projectsData = [
{
    id: 'the-phone-mason', // Unique ID for URL routing
    title: 'The Phone Mason',
    summary: 'A business website for a phone and computer repair shop, focusing on local SEO and lead generation.', // Short summary for the grid card
    images: [
        '../src/assets/features/the-phone-mason/1.png',
        '../src/assets/features/the-phone-mason/2.png',
        '../src/assets/features/the-phone-mason/3.png',
    ],
    description: 'I developed and deployed a comprehensive business website for The Phone Mason, a device repair specialist based in Howick, Auckland. The primary objective was to generate a steady stream of local leads. To achieve this, I implemented a robust local SEO strategy and performed extensive on-page optimisation. These efforts significantly boosted their visibility in organic search results, effectively converting website visitors into valuable customers for their repair services.',
    technologies: ['WordPress', 'Elementor', 'AWS', 'Google Analytics', 'Ahrefs', 'Photoshop', 'HTML', 'CSS', 'JavaScript'],
    githubUrl: '', // Replace with your actual GitHub repository URL
    liveUrl: 'https://thephonemason.nz/' ,
    // The actual live URL for the website
  },
{
    id: 'kiwikandy', // Unique ID for URL routing
    title: 'Kiwi Kandy',
    summary: 'An e-commerce store built to sell classic New Zealand confectionery to Kiwis living and working overseas.', // Short summary for the grid card
    images: [
        '../src/assets/features/kiwi-kandy/1.png',
        '../src/assets/features/kiwi-kandy/2.png',
        '../src/assets/features/kiwi-kandy/3.png',
    ],
    description: 'I developed a full-scale e-commerce website for KiwiKandy, a business dedicated to selling iconic New Zealand sweets and treats to customers abroad. The site was built on WordPress using the powerful WooCommerce plugin to handle all aspects of online sales. Key features included setting up international shipping zones, integrating secure payment gateways like Stripe. Creating a user-friendly product catalogue. The primary goal was to provide a seamless shopping experience for homesick Kiwis wanting a taste of home.',
    technologies: ['WordPress', 'WooCommerce', 'Stripe', 'Elementor', 'HTML', 'CSS', 'JavaScript'],
    githubUrl: '', // Replace with your actual GitHub repository URL
    liveUrl: 'https://www.kiwikandy.com' // Replace with the actual live URL if it's different
  },
  {
    id: 'social-meetup-app', // Unique ID for URL routing
    title: 'Social Meetup IOS App',
    summary: 'A full-stack, cross-platform mobile application designed to connect people through local events and activities.', // Short summary for the grid card
    images: [        
        '../src/assets/features/we-do/2.png',
        '../src/assets/features/we-do/1.jpeg',
    ],
    description: 'For university capstone project, my team and I developed "WeDo," a comprehensive social connection app for both iOS and Android. The platform allows users to create, discover, and join a wide range of events, from sports and volunteering to online gaming. The project involved building a React Native front-end and a Node.js back-end running on AWS serverless architecture. Key features include personalised event recommendations, event search with filtering, and a personal calendar to track activities. The primary goal was to foster community engagement and help users build meaningful connections.',
    technologies: ['React Native', 'Node.js', 'Express.js', 'AWS Lambda', 'AWS Cognito', 'API Gateway', 'S3', 'DynamoDB', 'JavaScript'],
    githubUrl: 'https://github.com/blankv15/Soical-Connection-Meetup-App',
    liveUrl: '' // Add the Google Play Store or Apple App Store URL here if available
  },
  {
    id: 'ai-content-generator', // Unique ID for URL routing
    title: 'AI Content Generator',
    summary: 'A web application that leverages Google\'s Gemini Pro to help users generate high-quality website content.', // Short summary for the grid card
    images: [
        '../src/assets/features/blogwriter/1.png',
    ],
    description: 'I developed an AI-powered content assistant to help bloggers, marketers, and website owners streamline their writing process. The application integrates Google\'s Gemini Pro API to generate coherent and context-aware content, such as "About" pages and full-length blog posts. I built the user interface with Streamlit, creating a clean and interactive experience. A key feature allows users to input their website\'s context to ensure the generated content aligns perfectly with their brand voice, helping to overcome writer\'s block and produce quality content efficiently.',
    technologies: ['Python', 'Google Gemini Pro', 'Streamlit'],
    githubUrl: 'https://github.com/blankv15/ai-content-generator',
    liveUrl: '' // Add a link to the live app if you have it deployed
  },
   {
    id: 'simple-stopwatch-react', // Unique ID for URL routing
    title: 'React Stopwatch',
    summary: 'A clean and functional stopwatch application built with React, featuring start, stop, and reset capabilities.', // Short summary for the grid card
    images: [
        '../src/assets/features/stopwatch/1.png',

    ],
    description: 'I built this stopwatch to demonstrate my understanding of core React concepts, particularly state management with hooks. The entire logic for starting, stopping, and resetting is handled cleanly within a single, reusable component. Below is the actual functioning component rendered directly into the page. <Stopwatch/>',
    technologies: ['React', 'JavaScript', 'HTML', 'CSS', 'Vite'],
    githubUrl: 'https://github.com/blankv15/Simple-Stop-Watch-React-App',
    liveUrl: '', // Add a link to the live app if you have it deployed
    embeddedComponent: 'Stopwatch', // Add this identifier

  },
   {
    id: 'simple-todo-app-react', // Unique ID for URL routing
    title: 'React To-Do',
    summary: 'A classic to-do list application built to demonstrate fundamental React concepts like state management and event handling.',
    images: [
              '../src/assets/features/todo/1.png',


    ],
    description: 'I developed this clean and responsive to-do list application as a practical exercise in core React principles. The app allows users to add new tasks, mark them as complete, and delete them from the list. The project relies heavily on the `useState` hook to manage the list of tasks and is structured with reusable components for the input form and the individual task items. It\'s a strong demonstration of component-based architecture and managing state within a modern front-end framework.',
    technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/blankv15/Simple-To-Do-App-Built-with-React',
    liveUrl: '', // Add a link to the live app if you have it deployed
    embeddedComponent: 'ToDoList', // Add this identifier

  }
  
];
