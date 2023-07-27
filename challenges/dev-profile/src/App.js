import './App.css';

const skills = [
  {
    skill: '.NET',
    level: 'advanced',
    color: '#E680FF',
  },
  {
    skill: 'Angular',
    level: 'advanced',
    color: '#F08080',
  },
  {
    skill: 'React',
    level: 'beginner',
    color: '#00BFFF',
  },
  {
    skill: 'Svelte',
    level: 'intermediate',
    color: '#FF6347',
  },
];

function App() {
  return (
    <div className="card">
      <Avatar name="neil" avatar="avatar.jpg" />
      <div className="data">
        <Intro
          fullName="Neil Tsai"
          biography="Step out of your comfort zone!"
        />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar({ name, avatar }) {
  return <img className="avatar" src={avatar} alt={name} />;
}

function Intro({ fullName, biography }) {
  return (
    <div>
      <h1>{fullName}</h1>
      <p>{biography}</p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill skill={skill} key={skill.skill} />
      ))}
    </div>
  );
}

function Skill({ skill }) {
  const getEmoji = (level) => {
    switch (level) {
      case 'beginner':
        return '👌';
      case 'intermediate':
        return '👍';
      case 'advanced':
        return '🤘';
      default:
        return '👌';
    }
  };
  return (
    <div className="skill" style={{ backgroundColor: skill.color }}>
      <span>{skill.skill}</span>
      <span>{getEmoji(skill.level)}</span>
    </div>
  );
}

export default App;
