const sampleListings = [
    {
        title: "Skateboarding",
        description: "Skateboarding is a dynamic and exciting sport which improves balance, coordination, and agility. It is a skill that can be enjoyed by people of all ages and skill levels Whether you're interested in cruising down the street, mastering tricks, or simply having fun. These lessons are designed to teach you everything from basic balance to advanced tricks such that you can learn at your own pace, with customized lessons based on your goals.",
        image: "https://cdn.pixabay.com/photo/2023/08/20/15/56/ai-generated-8202620_1280.jpg",
        price: 1500,
        location: "Juhu Beach Skate Park or local skate parks around Mumbai, Maharashtra",
        country: "India",
        by: "Aarav Deshmukh"
    },
    {
        title: "Psychology & Emotional Intelligence",
        description: "Learn the foundations of psychology — from cognition and behavior to emotional regulation and self-awareness. These sessions are interactive and grounded in real-life applications. Whether you're a student, parent, or professional, the classes aim to build deep psychological insight in a simplified and empowering manner.",
        image: "https://cdn.pixabay.com/photo/2014/11/24/18/50/mind-544404_1280.png",
        price: 1200,
        location: "South Delhi Counseling Center or online sessions across India",
        country: "India",
        by: "Dr. Neha Kapoor"
    },
    {
        title: "Basic Neurology for Curious Minds",
        description: "Explore the brain and nervous system in an easy-to-understand format. Perfect for students, biology enthusiasts, or anyone intrigued by how neurons fire, how reflexes work, or how memory is formed. Learn using models, simulations, and simple language.",
        image: "https://cdn.pixabay.com/photo/2024/07/18/04/41/woman-8903092_1280.jpg",
        price: 1800,
        location: "Indian Institute of Science Campus, Bengaluru or online nationwide",
        country: "India",
        by: "Dr. Kiran Iyer"
    },
    {
        title: "Indian Bamboo Flute (Bansuri)",
        description: "Immerse yourself in the meditative sound of bansuri. Learn basic fingering, breath control, ragas, and compositions. Perfect for music seekers.",
        image: "https://cdn.pixabay.com/photo/2012/04/26/10/34/flute-41967_1280.png",
        price: 900,
        location: "Banaras Ghats or forested learning space in Almora",
        country: "India",
        by: "Raghav Sharma"
    },
    {
        title: "Badminton Coaching (All Levels)",
        description: "From beginner footwork and grip to advanced strategies and smashes, these sessions offer a structured approach to becoming a better badminton player. Get personalized attention and game-based drills to sharpen your reflexes and build stamina.",
        image: "https://cdn.pixabay.com/photo/2023/12/09/13/28/ai-generated-8439385_1280.jpg",
        price: 1000,
        location: "Pullela Gopichand Badminton Academy, Hyderabad or community courts",
        country: "India",
        by: "Sanjana Rao"
    },
    {
        title: "Learn the Art of Acrobatics",
        description: "Acrobatics improves flexibility, strength, and spatial awareness. These classes start from safe basics like rolls and balance, gradually progressing to partner stunts and aerial maneuvers. Taught by certified acrobats with an emphasis on safety and discipline.",
        image: "https://cdn.pixabay.com/photo/2018/08/23/22/02/acrobat-3626844_1280.jpg",
        price: 2000,
        location: "Ravindra Kalakshetra Grounds, Mysuru or nearby open lawns",
        country: "India",
        by: "Mehul Rane"
    },
    {
        title: "Gymnastics for Kids and Adults",
        description: "Learn floor routines, balance beam, and body control with structured progression and fun drills. Ideal for children and young adults who want to build foundational strength, poise, and flexibility through one of the world’s most complete sports.",
        image: "https://cdn.pixabay.com/photo/2012/04/05/01/47/roman-rings-25773_1280.png",
        price: 1700,
        location: "Shivaji Park Gymnastics Hall, Mumbai",
        country: "India",
        by: "Kavya Joshi"
    },
    {
        title: "Guitar — Improvisation & Melody",
        description: "Whether you're a beginner or an intermediate, these guitar lessons focus on building a connection with your instrument. Learn chords, scales, and improvisation styles across blues, rock, and Indian fusion.",
        image: "https://cdn.pixabay.com/photo/2017/01/31/14/43/acoustic-guitar-2024669_1280.png",
        price: 1400,
        location: "Himalayan Café Courtyard, Dharamshala",
        country: "India",
        by: "Ishaan Malhotra"
    },
    {
        title: "Wisdom Literature",
        description: "A guided dive into the Vedanta along with literature from all over the world. Discussions include metaphors and relevance to modern life. Language is kept simple and explanations are philosophical yet grounded.",
        image: "https://cdn.pixabay.com/photo/2022/02/02/10/56/questions-6988157_1280.png",
        price: 200,
        location: "Riverbank Reading Pavilion, Rishikesh, Uttarakhand",
        country: "India",
        by: "Acharya Prashant"
    },
    {
        title: "Sketching Lessons: From Pencil to Perspective",
        description: "Unlock your sketching with structured lessons covering human anatomy, shading, nature, and object drawing. Suitable for absolute beginners and intermediates looking to unlock their expression",
        image: "https://cdn.pixabay.com/photo/2020/05/05/20/04/draw-5134847_1280.png",
        price: 1100,
        location: "Kala Bhavana Lawns, Santiniketan or art cafés in Pune",
        country: "India",
        by: "Siddharth Patil"
    },
    {
        title: "Music Theory Made Simple",
        description: "Demystify notes, chords, time signatures, and harmony. This course is ideal for vocalists and instrumentalists who want to understand what they’re playing or composing.",
        image: "https://cdn.pixabay.com/photo/2023/12/22/16/29/sheet-music-8463988_1280.jpg",
        price: 1300,
        location: "Tea gardens of Munnar or local music schools in Bengaluru",
        country: "India",
        by: "Priya Nambiar"
    },
    {
        title: "Graphic Design",
        description: "Master layout, typography, and color theory using Adobe tools and Figma. Projects are portfolio-based and emphasize clarity, storytelling, and design thinking for real-world applications.",
        image: "https://cdn.pixabay.com/photo/2017/10/10/21/47/laptop-2838921_1280.jpg",
        price: 2000,
        location: "Design retreats in Auroville or cafés in Kochi or online",
        country: "India",
        by: "Ritika Menon"
    },
    {
        title: "Contemporary Dance — Flow and Expression",
        description: "Develop movement vocabulary, balance, and self-expression with contemporary techniques. These classes include improvisation, floor work, and choreography sessions. Open to all age groups.",
        image: "https://cdn.pixabay.com/photo/2021/02/05/10/34/man-5984098_1280.jpg",
        price: 1600,
        location: "Natural dance deck in the Nilgiris foothills, Coimbatore",
        country: "India",
        by: "Tarun Sekhar"
    },
    {
        title: "Physics Concepts in Real Life",
        description: "Learn classical mechanics, electromagnetism, and relativity in a conceptual and applied way. Ideal for high school students and curious learners, with interactive experiments and logical analogies.",
        image: "https://cdn.pixabay.com/photo/2013/11/28/09/50/albert-einstein-219675_1280.jpg",
        price: 1500,
        location: "IIT Campus Courtyard, Kanpur or forest science field center near Mussoorie",
        country: "India",
        by: "Dr. Rahul Verma"
    },
    {
        title: "Latin Language & Roots — Unlock Ancient Wisdom",
        description: "Step into the classical world by learning Latin — the language of scholars, saints, and scientists. This course focuses on reading, pronunciation, grammar fundamentals, and vocabulary that lays the foundation for understanding Western philosophical, legal, and scientific texts. Ideal for linguists, students of etymology, and curious minds who want to explore how Latin shaped modern languages.",
        image: "https://cdn.pixabay.com/photo/2018/09/14/15/21/pompeii-3677352_1280.jpg",
        price: 1250,
        location: "Quiet stone library by the hills in Panchgani or online across India",
        country: "India",
        by: "Devika Rao"
    }
];

module.exports = sampleListings;