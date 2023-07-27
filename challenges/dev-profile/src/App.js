import './App.css';

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

function Avatar(props) {
  return <img className="avatar" src={props.avatar} alt={props.name} />;
}

function Intro(props) {
  return (
    <div>
      <h1>{props.fullName}</h1>
      <p>{props.biography}</p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill skill=".NET" emoji="🤘" />
      <Skill skill="Angular" emoji="👌" />
      <Skill skill="React" emoji="👍" />
      <Skill skill="Svelte" emoji="🤙" />
    </div>
  );
}

function Skill(props) {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <div className="skill" style={{ backgroundColor: getRandomColor() }}>
      <span>{props.skill}</span>
      <span>{props.emoji}</span>
    </div>
  );
}

export default App;
