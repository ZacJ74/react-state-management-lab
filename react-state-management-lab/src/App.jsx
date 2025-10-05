import { useState } from 'react';
import './App.css'; // Don't forget to import the CSS

const initialZombieFighters = [
  {
    id: 1,
    name: 'Survivor',
    price: 12,
    strength: 6,
    agility: 4,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png',
  },
  {
    id: 2,
    name: 'Scavenger',
    price: 10,
    strength: 5,
    agility: 5,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png',
  },
  {
    id: 3,
    name: 'Shadow',
    price: 18,
    strength: 7,
    agility: 8,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png',
  },
  {
    id: 4,
    name: 'Tracker',
    price: 14,
    strength: 7,
    agility: 6,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png',
  },
  {
    id: 5,
    name: 'Sharpshooter',
    price: 20,
    strength: 6,
    agility: 8,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png',
  },
  {
    id: 6,
    name: 'Medic',
    price: 15,
    strength: 5,
    agility: 7,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png',
  },
  {
    id: 7,
    name: 'Engineer',
    price: 16,
    strength: 6,
    agility: 5,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png',
  },
  {
    id: 8,
    name: 'Brawler',
    price: 11,
    strength: 8,
    agility: 3,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png',
  },
  {
    id: 9,
    name: 'Infiltrator',
    price: 17,
    strength: 5,
    agility: 9,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png',
  },
  {
    id: 10,
    name: 'Leader',
    price: 22,
    strength: 7,
    agility: 6,
    img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png',
  },
];

const App = () => {
  // 1. Create state variables
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters, setZombieFighters] = useState(initialZombieFighters);

  // ---

  // 7. Create handleAddFighter()
  const handleAddFighter = (fighter) => {
    // Check if enough money is available
    if (money < fighter.price) {
      console.log(`Not enough money to hire ${fighter.name}! You need ${fighter.price - money} more.`);
      return; // Stop the function if the budget is insufficient
    }

    // Update team: Add the new fighter
    setTeam([...team, fighter]);

    // Update money: Subtract the fighter's price
    setMoney(money - fighter.price);

    // Update zombieFighters: Remove the added fighter
    const newZombieFighters = zombieFighters.filter(
      (f) => f.id !== fighter.id
    );
    setZombieFighters(newZombieFighters);
  };

  // ---

  // 12. Create handleRemoveFighter()
  const handleRemoveFighter = (fighter) => {
    // Update team: Remove the fighter
    const newTeam = team.filter((f) => f.id !== fighter.id);
    setTeam(newTeam);

    // Update money: Refund the fighter's price
    setMoney(money + fighter.price);

    // Update zombieFighters: Add the fighter back to the available list
    // We create a new array with the removed fighter and the existing available fighters.
    // It's good practice to ensure the list remains sorted, though not strictly required by the prompt.
    const newZombieFighters = [...zombieFighters, fighter].sort((a, b) => a.id - b.id);
    setZombieFighters(newZombieFighters);
  };

  // ---

  // 9. Display the team's total strength and agility (calculated from team state)
  const totalStrength = team.reduce((sum, fighter) => sum + fighter.strength, 0);
  const totalAgility = team.reduce((sum, fighter) => sum + fighter.agility, 0);
  const teamTotalCost = team.reduce((sum, fighter) => sum + fighter.price, 0);


  return (
    <>
      <h1>Zombie Apocalypse Team Builder 🧟‍♀️</h1>

      <div className="stats-panel">
        <p>💰 **Available Money:** ${money}</p>
        <p>💪 **Total Strength:** {totalStrength}</p>
        <p>🤸 **Total Agility:** {totalAgility}</p>
        <p>💳 **Team Total Cost:** ${teamTotalCost}</p>
      </div>

      <hr />

      <h2>Your Team ({team.length} Members)</h2>
      {/* 8. Display team or "Pick some team members!" */}
      {team.length === 0 ? (
        <p>Pick some team members!</p>
      ) : (
        <ul>
          {team.map((fighter) => (
            <li key={fighter.id}>
              <img src={fighter.img} alt={fighter.name} width="50" height="50" />
              <div>**{fighter.name}**</div>
              <div>Price: ${fighter.price}</div>
              <div>Strength: {fighter.strength}</div>
              <div>Agility: {fighter.agility}</div>
              {/* 11. Add Remove button */}
              <button onClick={() => handleRemoveFighter(fighter)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h2>Available Fighters ({zombieFighters.length})</h2>
      {/* 4. Display the list of zombieFighters */}
      <ul>
        {zombieFighters.map((fighter) => (
          <li key={fighter.id}>
            <img src={fighter.img} alt={fighter.name} width="50" height="50" />
            <div>**{fighter.name}**</div>
            <div>Price: ${fighter.price}</div>
            <div>Strength: {fighter.strength}</div>
            <div>Agility: {fighter.agility}</div>
            {/* 6. Add Add button */}
            <button onClick={() => handleAddFighter(fighter)}>
              Add
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;