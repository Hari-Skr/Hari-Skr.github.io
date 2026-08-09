export const profile = {
  name: 'S Hari Sankar',
  role: 'Backend × AI Engineer',
  location: 'Trivandrum, India',
  email: 'harisankar1603@gmail.com',
  phone: '+91 8714509489',
  github: 'https://github.com/Hari-Skr',
  linkedin: 'https://linkedin.com/in/hari1111',
  summaryPoints: [
    'Ship production-ready AI systems.',
    'Design dependable backends and data pipelines.',
    'Turn early ideas into useful products.',
  ],
}

export const about = {
  introduction:
    'I am a software and AI engineer based in Trivandrum. My work sits between backend engineering, data systems, and applied machine learning.',
  interests:
    'I like working on backend architecture, data pipelines, developer tools, and AI features that solve a clear product problem.',
  approach:
    'I focus on turning complex, open-ended problems into functional software, bridging the gap between researching systems and engineering the resilient software model required to successfully deploy them.',
  outsideDelivery:
    'Mentoring through ACM during college shaped how I learn, collaborate, and explain technical ideas.',
}

export const education = {
  degree: 'B.Tech in Computer Science',
  specialization: 'Artificial Intelligence & Machine Learning',
  university: 'Amrita Vishwa Vidyapeetham',
  period: '2021—2025',
  award: 'Silver Medal for Academic Excellence',
}

export const skillGroups = [
  {
    id: 'software',
    label: 'Software engineering',
    skills: ['TypeScript', 'React', 'Golang', 'C++', 'FastAPI', 'Django', 'Elysia', 'Express', 'Docker'],
  },
  {
    id: 'data',
    label: 'Data systems',
    skills: ['PostgreSQL', 'Cassandra', 'MongoDB', 'MinIO', 'ETL', 'Data Modeling'],
  },
  {
    id: 'ai',
    label: 'Applied AI',
    skills: ['PyTorch', 'Transformers', 'TRL', 'PEFT', 'RAG', 'NLP', 'Computer Vision'],
  },
]

export const experience = [
  {
    period: 'May — Jul 2024',
    company: 'Metro Global Solutions',
    role: 'Data Engineer Intern',
    logo: {
      src: '/Metro%20global.jpeg',
      width: 58,
      height: 58,
    },
    website: 'https://www.metro-gsc.in/',
    summary:
      'Engineered robust ETL pipelines and leveraged generative AI to automate complex data validation and extraction processes.',
  },
  {
    period: 'Jan — Jun 2025',
    company: 'Doctreen',
    role: 'AI R&D Intern',
    logo: {
      src: '/Doctreen.jpeg',
      width: 108,
      height: 34,
    },
    website: 'https://www.doctreen.com/',
    summary:
      'Bridged research and software by engineering agent-driven RAG systems and developing a real-time, full-stack decision tree editor.',
  },
  {
    period: 'Jun 2025 — Present',
    company: 'Doctreen',
    role: 'AI Engineer',
    logo: {
      src: '/Doctreen.jpeg',
      width: 108,
      height: 34,
    },
    website: 'https://www.doctreen.com/',
    summary:
      'Researched and built advanced ML based tuning pipelines , scaled synthetic data ETLs for mass report generation, and seamlessly served fine-tuned models in the cloud.'
  },
]

export const projects = [
  {
    id: '01',
    title: 'StratLog',
    type: 'Backend & Infrastructure',
    period: '2026 — Present',
    summary:
      'A milestone-driven social network that gives developers a structured way to publish technical stories and collaborate on open projects.',
    contribution:
      'I designed the relational data model, secure REST API, authentication flow, and Docker-based development infrastructure.',
    stack: ['TypeScript', 'PostgreSQL', 'REST', 'Docker'],
  },
  {
    id: '02',
    title: 'Efficiently AI',
    type: 'Full-stack Product',
    period: '2024 — 2025',
    summary:
      'A productivity application that turns unstructured tasks into actionable workflows and realistic weekly routines.',
    contribution:
      'I built the full-stack product and the AI-assisted task creation and scheduling logic behind it.',
    stack: ['Python', 'Django', 'JavaScript', 'Tailwind'],
  },
  {
    id: '03',
    title: 'Code2Graph',
    type: 'Developer Tool',
    period: '2024',
    summary:
      'A developer tool that turns code or written logic into a visual knowledge graph for easier exploration and explanation.',
    contribution:
      'I connected an LLM transformation pipeline to a Django backend and a web interface for graph generation.',
    stack: ['Django', 'LLM API', 'Knowledge Graphs', 'Web'],
  },
  {
    id: '04',
    title: 'AssistAI',
    type: 'Applied AI',
    period: '2024',
    summary:
      'A retrieval-augmented customer support agent that grounds answers in relevant knowledge through semantic search.',
    contribution:
      'I fine-tuned a language model for customer support and built the retrieval workflow around it.',
    stack: ['RAG', 'Transformers', 'NLP', 'Python'],
  },
  {
    id: '05',
    title: 'Vision Bot',
    type: 'Edge AI',
    period: '2023',
    summary:
      'A Raspberry Pi-powered exploratory robot that combines live perception with physical movement and control.',
    contribution:
      'I integrated YOLOv3 with the Raspberry Pi for real-time object detection and hardware control.',
    stack: ['Computer Vision', 'Raspberry Pi', 'YOLOv3', 'Python'],
  },
]

export const certifications = [
  {
    title: 'Professional Data Scientist Track',
    issuer: 'DataCamp',
    focus: 'Data science',
    href: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/8407de2707862419bba9f60ecb22049d5c065279',
  },
  {
    title: 'Machine Learning for Business',
    issuer: 'DataCamp',
    focus: 'Applied ML',
    href: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/050dd511c5e73d06dc9a88cc4ec2c9b94e681085',
  },
  {
    title: 'Data Analysis with Python',
    issuer: 'freeCodeCamp',
    focus: 'Python / analytics',
    href: 'https://www.freecodecamp.org/certification/fcc7fdaa634-6dbd-4eec-9131-422e5ba58f28/data-analysis-with-python-v7',
  },
  {
    title: 'C++ Problem Solving — Silver',
    issuer: 'CodeChef',
    focus: 'Algorithms',
    href: 'https://www.codechef.com/certificates/public/50d47f7',
  },
]
