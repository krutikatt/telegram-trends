import React, { useState } from 'react';
import styled from 'styled-components';

// List of hours in a day (24-hour format)
const hours = Array.from({ length: 24 }, (_, index) => index);

// Hardcoded hourly message counts for the current day
const hardcodedData = {
  0: 5, 1: 0, 2: 3, 3: 0, 4: 1, 5: 2, 6: 7, 7: 15,
  8: 30, 9: 25, 10: 18, 11: 12, 12: 20, 13: 17, 14: 10, 15: 8,
  16: 25, 17: 30, 18: 40, 19: 35, 20: 10, 21: 5, 22: 0, 23: 1,
};

const HeatMap = ({ theme }) => {
  const [tooltip, setTooltip] = useState({ visible: false, content: '', top: 0, left: 0 });

  const handleMouseEnter = (e, hour, count) => {
    const container = document.querySelector('.heatmap-container');
    const containerRect = container.getBoundingClientRect();
    const rect = e.target.getBoundingClientRect();
    const tooltipWidth = 140;
    const tooltipHeight = 50;

    let tooltipTop = rect.top + window.scrollY - tooltipHeight - 10;
    let tooltipLeft = rect.left + window.scrollX + rect.width / 2 - tooltipWidth / 2;

    if (tooltipLeft < containerRect.left) {
      tooltipLeft = containerRect.left + 10;
    } else if (tooltipLeft + tooltipWidth > containerRect.right) {
      tooltipLeft = containerRect.right - tooltipWidth - 10;
    }

    setTooltip({
      visible: true,
      content: `Hour ${hour}: ${count} message${count !== 1 ? 's' : ''}`,
      top: tooltipTop,
      left: tooltipLeft
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const renderHours = () => {
    return hours.map(hour => {
      const count = hardcodedData[hour] || 0;
      const color = getColor(count);

      return (
        <HourSquare
          key={hour}
          style={{ backgroundColor: color }}
          onMouseEnter={(e) => handleMouseEnter(e, hour, count)}
          onMouseLeave={handleMouseLeave}
        />
      );
    });
  };

  const getColor = (count) => {
    if (count === 0) return theme === 'dark' ? '#444' : '#ddd';
    if (count <= 10) return '#54d5d9';
    if (count <= 20) return '#2c9393';
    return '#176364';
  };

  return (
    <HeatmapContainer className={`heatmap-container ${theme}`}>
      <HourWrapper>
        
        <HoursGrid>
          {renderHours()}
        </HoursGrid>
      </HourWrapper>
      {tooltip.visible && (
        <Tooltip theme={theme} style={{ top: tooltip.top, left: tooltip.left }} dangerouslySetInnerHTML={{ __html: tooltip.content }} />
      )}
    </HeatmapContainer>
  );
};

// Styled components for HeatMap
const HeatmapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  box-sizing: border-box;
  padding: 20px;
  margin: 10px 0;
`;

const HourWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 10px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 600px) {
    padding: 5px;
  }
`;

const MonthName = styled.div`
  margin-bottom: 10px;
  font-size: 2vw;  /* Responsive font size */
  font-weight: bold;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#333')};
  white-space: nowrap;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 3vw;
  }
`;

const HoursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 6 columns for better display */
  grid-gap: 5px;
  width: 100%;
  height: auto;

  @media (max-width: 600px) {
    grid-gap: 2px;
  }
`;

const HourSquare = styled.div`
  width: 100%;
  padding-top: 100%;  /* Maintain aspect ratio */
  position: relative;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  padding: 10px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#333' : '#fff')};
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#ADD8E6' : '#000080')};
  border-radius: 5px;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  font-size: 0.9em;
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
  opacity: 0.9;
`;

export default HeatMap;
