import React, { useState } from 'react';
import dayjs from 'dayjs';

function Days({ weatherData, onDaySelect }) {
  // Obtenir la date actuelle
  const currentDate = dayjs();

  // Tableau des noms des jours de la semaine
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Index du jour actuel (0 pour dimanche, 1 pour lundi, etc.)
  const currentDayIndex = currentDate.day();

  // Réorganiser le tableau pour commencer par aujourd'hui
  const reorderedDaysOfWeek = [
    ...daysOfWeek.slice(currentDayIndex),  // Les jours après aujourd'hui
    ...daysOfWeek.slice(0, currentDayIndex) // Les jours avant aujourd'hui
  ];

  // Extraire les cinq premiers jours à partir de l'index actuel
  const nextFiveDays = reorderedDaysOfWeek.slice(0, 5);

  // État pour suivre l'index du jour sélectionné
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Function to handle day click
  const handleDayClick = (dayIndex) => {
    // Mettre à jour l'index du jour sélectionné
    setSelectedDayIndex(dayIndex);
    // Passer les données météorologiques du jour sélectionné au composant parent
    onDaySelect(weatherData.forecast.forecastday[dayIndex]);
  };

  return (
    <div className="card-action">
      {nextFiveDays.map((day, index) => (
        <a key={index} href="#" style={{ fontWeight: index === selectedDayIndex ? 'bold' : 'normal' }} onClick={() => handleDayClick(index)}>
          {day}
        </a>
      ))}
    </div>
  );
}

export default Days;
