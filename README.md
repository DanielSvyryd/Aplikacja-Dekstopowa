
  # tRocker - student personal development progress tracker

  This is a code bundle for Student Progress Tracker Prototype. The original protorype is available at https://www.figma.com/make/QOs40LQ3Oji3wOI06JJYE5/Student-Progress-Tracker-Prototype.
  link: http://localhost:5173/

  ## Basic setup

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  Clone the repo.

  Run npm install.

  Create a .env file based on .env.example

  Run `npm run dev` and `npx electron .`

  ## Core functionality

[] Real-time synchronization with cloud-based records, allowing for the management of student profiles and their respective achievements.

[] A visual dashboard to monitor submissions, pending tasks, and deadlines, ensuring no progress goes unnoticed.

[] Unlike local-only solutions, tRocker integrates directly with a remote database to maintain data integrity across sessions.

[] Prepared for future integration with analytical tools to evaluate group dynamics and individual growth over time.

## Technical architecture

[] Frontend: React with TypeScript, ensuring a predictable data flow and structural integrity across the UI components.

[] Desktop layer: Electron, configured with strict security protocols, including context isolation and secure IPC (Inter-Process Communication) bridges for backend interactions.

[] Database: MongoDB Atlas, leveraging a cloud-based NoSQL approach for flexible data modeling and global accessibility.

[] Styling: Tailwind CSS, used to create a lean, responsive, and non-distractive interface.

[] Environment management: secure handling of sensitive credentials via encapsulated environment variables.
