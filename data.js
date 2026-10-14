// CareerPath AI - data.js
// Data: skills with free courses, careers, project ideas, quiz questions, demo hackathons and jobs.
const SK={Python:[4,'Beginner',[['Python for Everybody','py4e.com','https://www.py4e.com/'],['Kaggle: Python','Kaggle','https://www.kaggle.com/learn/python']]],
SQL:[3,'Beginner',[['SQLBolt interactive lessons','SQLBolt','https://sqlbolt.com/'],['Kaggle: Intro to SQL','Kaggle','https://www.kaggle.com/learn/intro-to-sql']]],
Statistics:[4,'Beginner',[['Statistics and Probability','Khan Academy','https://www.khanacademy.org/math/statistics-probability']]],
Mathematics:[5,'Intermediate',[['Linear Algebra','Khan Academy','https://www.khanacademy.org/math/linear-algebra']]],
Pandas:[2,'Beginner',[['Kaggle: Pandas','Kaggle','https://www.kaggle.com/learn/pandas']]],
'Data Visualization':[2,'Beginner',[['Kaggle: Data Visualization','Kaggle','https://www.kaggle.com/learn/data-visualization']]],
'Machine Learning':[6,'Intermediate',[['Kaggle: Intro to Machine Learning','Kaggle','https://www.kaggle.com/learn/intro-to-machine-learning']]],
'Deep Learning':[6,'Advanced',[['Practical Deep Learning for Coders','fast.ai','https://course.fast.ai/']]],
LLMs:[3,'Intermediate',[['Hugging Face Learn','Hugging Face','https://huggingface.co/learn']]],
Git:[1,'Beginner',[['Pro Git (book)','git-scm.com','https://git-scm.com/book/en/v2']]],
'HTML/CSS':[3,'Beginner',[['Learn Web Development','MDN','https://developer.mozilla.org/en-US/docs/Learn']]],
JavaScript:[4,'Beginner',[['freeCodeCamp curriculum','freeCodeCamp','https://www.freecodecamp.org/']]],
React:[3,'Intermediate',[['Learn React','react.dev','https://react.dev/learn']]],
DSA:[8,'Intermediate',[['CS50x','Harvard','https://cs50.harvard.edu/x/'],['CSES Problem Set','CSES','https://cses.fi/problemset/']]],
Linux:[2,'Beginner',[['Linux Journey','linuxjourney.com','https://linuxjourney.com/']]],
'Security Basics':[4,'Intermediate',[['OverTheWire wargames','OverTheWire','https://overthewire.org/wargames/'],['TryHackMe','TryHackMe','https://tryhackme.com/','M']]],
'Cloud Basics':[3,'Intermediate',[['AWS Skill Builder','AWS','https://skillbuilder.aws/','M']]],
Docker:[2,'Intermediate',[['Docker Get Started','Docker Docs','https://docs.docker.com/get-started/']]],
'CI/CD':[2,'Intermediate',[['GitHub Actions docs','GitHub','https://docs.github.com/en/actions']]]};
const C={da:['Data Analyst','📊','Turns data into charts and insights that help people decide.',['Python','SQL','Statistics','Pandas','Data Visualization','Git'],'SQL, Python, Pandas, Power BI or Tableau','Analyst intern, then Data Scientist'],
ds:['Data Scientist','🔬','Uses statistics and models to find patterns and predict outcomes.',['Python','Mathematics','Statistics','Pandas','Data Visualization','Machine Learning'],'Python, Pandas, scikit-learn, Jupyter','ML Engineer or research roles'],
ml:['Machine Learning Engineer','🤖','Builds, tests and ships machine learning models.',['Python','Mathematics','Pandas','Machine Learning','Deep Learning','Git'],'Python, scikit-learn, PyTorch, Docker','AI Engineer or MLOps'],
ai:['AI Engineer','🧠','Builds smart apps with deep learning and large language models.',['Python','Mathematics','Machine Learning','Deep Learning','LLMs','Git'],'PyTorch, Hugging Face, APIs','Senior AI roles or research'],
sw:['Software Developer','💻','Designs and builds software that solves real problems.',['Python','DSA','Git','Linux','SQL'],'Python or Java, Git, SQL, Linux','Backend, full-stack or app roles'],
web:['Web Developer','🌐','Creates websites and web apps people use every day.',['HTML/CSS','JavaScript','Git','React','SQL'],'HTML, CSS, JavaScript, React, Git','Full-stack developer'],
cy:['Cybersecurity Analyst','🛡️','Finds weaknesses and protects systems and data.',['Linux','Security Basics','Python','Git'],'Linux, Wireshark, Python','Security engineer or pen tester'],
cl:['Cloud Engineer','☁️','Builds and manages applications on cloud platforms.',['Linux','Cloud Basics','Docker','Python','Git'],'Linux, AWS/Azure/GCP, Docker','Solutions architect or DevOps'],
do:['DevOps Engineer','⚙️','Automates building, testing and running software.',['Linux','Git','Docker','CI/CD','Cloud Basics'],'Linux, Git, Docker, GitHub Actions','Site reliability or platform roles']};
const PR={da:[['Sales dashboard','Show monthly sales trends from a public CSV'],['SQL business report','Answer 10 business questions with SQL'],['End-to-end analysis','Clean data, find insights, present a story']],
ds:[['Exploratory data analysis','Explore a public dataset and share findings'],['Prediction model','Predict a value such as house prices'],['Full data science case','Frame a problem, model it, explain the results']],
ml:[['Iris classifier','Train and test a simple classifier'],['Image classifier','Classify images with a neural network'],['Deployed ML app','Serve a model through a small web app']],
ai:[['Sentiment checker','Label text as positive or negative'],['Document Q&A bot','Answer questions from your notes'],['AI study assistant','Combine an LLM with your own course data']],
sw:[['Command-line to-do app','Add, list and finish tasks'],['Library manager','Store books in a database'],['Team task tracker','Build an app with login and an API']],
web:[['Personal portfolio','A responsive page about you'],['Weather app','Show weather from a public API'],['Full-stack blog','Posts, login and a database']],
cy:[['Password strength checker','Rate passwords and explain why'],['Home network scan report','Document open ports in a lab you own'],['Capture-the-flag write-ups','Solve beginner challenges and write them up']],
cl:[['Static site on the cloud','Host a simple site online'],['Containerised app','Run an app in Docker'],['Scalable web app','Deploy with a load balancer and monitoring']],
do:[['Shell backup script','Automate a daily backup'],['Docker image for an app','Package an app to run anywhere'],['CI pipeline','Test and build on every commit']]};
const LV=['Beginner','Intermediate','Advanced'];
const Q=[['What do you enjoy most?',[['Finding patterns in numbers','da:2,ds:2,ml:1'],['Building things people can see and click','web:3,sw:1'],['Solving logic puzzles','sw:2,cy:1,ml:1'],['Teaching computers to learn','ml:2,ai:3,ds:1'],['Protecting systems from attacks','cy:3'],['Keeping systems running smoothly','do:2,cl:2']]],
['Which weekend project sounds best?',[['Make a chart report from data','da:3,ds:1'],['Build a small website or app','web:3,sw:2'],['Solve a security puzzle','cy:3'],['Train a model on a dataset','ml:3,ds:2,ai:1'],['Set up a server','cl:2,do:3']]],
['How do you feel about maths?',[['I love it','ds:2,ml:2,ai:2'],['It is fine','da:1,sw:1,cl:1,do:1'],['I prefer less maths','web:2,cy:1,do:1']]],
['What result makes you proud?',[['An insight that helps a decision','da:3,ds:2'],['A product people use','web:2,sw:3'],['A safer system','cy:3'],['A smart feature that learns','ai:3,ml:2'],['A fast, reliable platform','cl:3,do:2']]],
['Which skill do you already have?',[['Some Python','da:1,ds:1,ml:1,ai:1,sw:1'],['Some HTML and CSS','web:2'],['Some Linux or networking','cy:1,cl:1,do:1'],['None yet','']]],
['How do you like to work?',[['Alone, thinking deeply','ds:1,ml:1,cy:1'],['In a team building a product','web:1,sw:1,do:1'],['A mix of both','da:1,ai:1,cl:1']]]];
const H=[['Demo Hackathon: Campus AI Challenge','Sample Organiser','Hackathon','Engineering students, any year'],['Demo Coding Contest: Algorithm Sprint','Sample Coding Club','Coding contest','Any branch'],['Demo Innovation Challenge: Green Tech','Sample University Cell','Innovation challenge','Teams of 2 to 4'],['Demo Hackathon: Web for Good','Sample NGO Tech Group','Hackathon','Year 2 and above']];
const J=[['Demo Data Analyst Intern','Sample Company A','Internship','Year 2 to 4, any branch',['SQL','Statistics','Python']],['Demo Web Developer Intern','Sample Studio B','Internship','Year 2 to 4',['HTML/CSS','JavaScript','Git']],['Demo ML Intern','Sample Lab C','Internship','Year 3 to 4',['Python','Machine Learning','Mathematics']],['Demo Junior Software Developer','Sample Firm D','Job','Final year or graduate',['Python','DSA','Git']],['Demo Cloud Support Trainee','Sample Cloud E','Job','Any branch',['Linux','Cloud Basics']],['Demo Security Analyst Intern','Sample Security F','Internship','Year 3 to 4',['Linux','Security Basics','Python']]];
